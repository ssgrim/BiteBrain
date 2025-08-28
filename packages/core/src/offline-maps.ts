export interface OfflineTile {
  x: number;
  y: number;
  z: number;
  url: string;
  data: ArrayBuffer;
  downloadedAt: Date;
  expiresAt?: Date;
}

export interface OfflineRegion {
  id: string;
  name: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  zoomLevels: {
    min: number;
    max: number;
  };
  tiles: OfflineTile[];
  createdAt: Date;
  sizeBytes: number;
}

export class OfflineMapService {
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'bitebrain-offline-maps';
  private readonly DB_VERSION = 1;
  private mapboxToken: string | null = null;

  constructor(mapboxToken?: string) {
    this.mapboxToken = mapboxToken || null;
    this.initDB();
  }

  setMapboxToken(token: string) {
    this.mapboxToken = token;
  }

  private async initDB(): Promise<void> {
    // Only initialize in browser environment
    if (typeof window === 'undefined' || !window.indexedDB) {
      console.warn('IndexedDB not available - offline maps disabled');
      return;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create tiles store
        if (!db.objectStoreNames.contains('tiles')) {
          const tilesStore = db.createObjectStore('tiles', { keyPath: 'id' });
          tilesStore.createIndex('regionId', 'regionId', { unique: false });
          tilesStore.createIndex('xyz', ['x', 'y', 'z'], { unique: false });
        }

        // Create regions store
        if (!db.objectStoreNames.contains('regions')) {
          db.createObjectStore('regions', { keyPath: 'id' });
        }
      };
    });
  }

  async isOnline(): Promise<boolean> {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
  }

  async downloadRegion(
    regionId: string,
    name: string,
    bounds: OfflineRegion['bounds'],
    zoomLevels: OfflineRegion['zoomLevels'],
    onProgress?: (progress: { completed: number; total: number; currentTile: string }) => void
  ): Promise<OfflineRegion> {
    if (!this.db) await this.initDB();

    const tiles = this.calculateTilesInBounds(bounds, zoomLevels);
    const region: OfflineRegion = {
      id: regionId,
      name,
      bounds,
      zoomLevels,
      tiles: [],
      createdAt: new Date(),
      sizeBytes: 0
    };

    let completed = 0;
    const total = tiles.length;

    for (const tile of tiles) {
      try {
        const tileData = await this.downloadTile(tile.x, tile.y, tile.z);
        const offlineTile: OfflineTile = {
          ...tile,
          data: tileData,
          downloadedAt: new Date()
        };

        region.tiles.push(offlineTile);
        region.sizeBytes += tileData.byteLength;
        completed++;

        if (onProgress) {
          onProgress({
            completed,
            total,
            currentTile: `z${tile.z}/${tile.x}/${tile.y}`
          });
        }
      } catch (error) {
        console.warn(`Failed to download tile ${tile.z}/${tile.x}/${tile.y}:`, error);
      }
    }

    // Save region to database
    await this.saveRegion(region);

    return region;
  }

  private calculateTilesInBounds(
    bounds: OfflineRegion['bounds'],
    zoomLevels: OfflineRegion['zoomLevels']
  ): { x: number; y: number; z: number; url: string }[] {
    const tiles: { x: number; y: number; z: number; url: string }[] = [];

    for (let z = zoomLevels.min; z <= zoomLevels.max; z++) {
      const minTile = this.latLngToTile(bounds.north, bounds.west, z);
      const maxTile = this.latLngToTile(bounds.south, bounds.east, z);

      for (let x = minTile.x; x <= maxTile.x; x++) {
        for (let y = minTile.y; y <= maxTile.y; y++) {
          tiles.push({
            x,
            y,
            z,
            url: `https://api.mapbox.com/v4/mapbox.satellite/${z}/${x}/${y}@2x.webp?access_token=${this.mapboxToken}`
          });
        }
      }
    }

    return tiles;
  }

  private latLngToTile(lat: number, lng: number, zoom: number): { x: number; y: number } {
    const x = Math.floor((lng + 180) / 360 * Math.pow(2, zoom));
    const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
    return { x, y };
  }

  private async downloadTile(x: number, y: number, z: number): Promise<ArrayBuffer> {
    if (!this.mapboxToken) {
      throw new Error('Mapbox token not set');
    }

    const url = `https://api.mapbox.com/v4/mapbox.satellite/${z}/${x}/${y}@2x.webp?access_token=${this.mapboxToken}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download tile: ${response.status}`);
    }

    return await response.arrayBuffer();
  }

  private async saveRegion(region: OfflineRegion): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['regions', 'tiles'], 'readwrite');

      // Save region metadata
      const regionStore = transaction.objectStore('regions');
      const regionRequest = regionStore.put(region);

      regionRequest.onerror = () => reject(regionRequest.error);
      regionRequest.onsuccess = () => {
        // Save individual tiles
        const tileStore = transaction.objectStore('tiles');

        region.tiles.forEach(tile => {
          const tileWithRegionId = { ...tile, regionId: region.id, id: `${region.id}-${tile.z}-${tile.x}-${tile.y}` };
          tileStore.put(tileWithRegionId);
        });

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      };
    });
  }

  async getRegion(regionId: string): Promise<OfflineRegion | null> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['regions'], 'readonly');
      const store = transaction.objectStore('regions');
      const request = store.get(regionId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAllRegions(): Promise<OfflineRegion[]> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['regions'], 'readonly');
      const store = transaction.objectStore('regions');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  }

  async deleteRegion(regionId: string): Promise<void> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['regions', 'tiles'], 'readwrite');

      // Delete region metadata
      const regionStore = transaction.objectStore('regions');
      const regionRequest = regionStore.delete(regionId);

      regionRequest.onerror = () => reject(regionRequest.error);
      regionRequest.onsuccess = () => {
        // Delete associated tiles
        const tileStore = transaction.objectStore('tiles');
        const index = tileStore.index('regionId');
        const tileRequest = index.openCursor(IDBKeyRange.only(regionId));

        tileRequest.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor) {
            cursor.delete();
            cursor.continue();
          }
        };

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      };
    });
  }

  async getTile(x: number, y: number, z: number): Promise<OfflineTile | null> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['tiles'], 'readonly');
      const store = transaction.objectStore('tiles');
      const index = store.index('xyz');
      const request = index.get([x, y, z]);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getStorageUsage(): Promise<{ used: number; available: number }> {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['tiles'], 'readonly');
      const store = transaction.objectStore('tiles');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const tiles = request.result || [];
        const used = tiles.reduce((total, tile) => total + tile.data.byteLength, 0);

        // Estimate available storage (this is approximate)
        const available = 50 * 1024 * 1024; // 50MB estimate for IndexedDB

        resolve({ used, available });
      };
    });
  }
}

export const offlineMapService = new OfflineMapService();
