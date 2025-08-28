import React, { useState, useEffect } from 'react';
import { OfflineMapService, OfflineRegion, offlineMapService } from '@bitebrain/core';

interface OfflineDownloadInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  mapboxToken: string;
  currentLocation?: { lat: number; lng: number };
}

interface DownloadProgress {
  completed: number;
  total: number;
  currentTile: string;
}

export const OfflineDownloadInterface: React.FC<OfflineDownloadInterfaceProps> = ({
  isOpen,
  onClose,
  mapboxToken,
  currentLocation
}) => {
  const [regions, setRegions] = useState<OfflineRegion[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress | null>(null);
  const [storageInfo, setStorageInfo] = useState<{ used: number; available: number } | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      loadRegions();
      loadStorageInfo();
      // Set the mapbox token for the service
      offlineMapService.setMapboxToken(mapboxToken);
    }
  }, [isOpen, mapboxToken]);

  const loadRegions = async () => {
    try {
      const savedRegions = await offlineMapService.getAllRegions();
      setRegions(savedRegions);
    } catch (error) {
      console.error('Failed to load regions:', error);
    }
  };

  const loadStorageInfo = async () => {
    try {
      const info = await offlineMapService.getStorageUsage();
      setStorageInfo(info);
    } catch (error) {
      console.error('Failed to load storage info:', error);
    }
  };

  const handleDownloadRegion = async (regionType: string) => {
    if (!currentLocation) {
      alert('Location not available. Please enable location services.');
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(null);

    try {
      let bounds: OfflineRegion['bounds'];
      let zoomLevels: OfflineRegion['zoomLevels'];
      let regionName: string;

      switch (regionType) {
        case 'current':
          // Small region around current location
          bounds = {
            north: currentLocation.lat + 0.01,
            south: currentLocation.lat - 0.01,
            east: currentLocation.lng + 0.01,
            west: currentLocation.lng - 0.01
          };
          zoomLevels = { min: 12, max: 16 };
          regionName = 'Current Location';
          break;
        case 'nearby':
          // Medium region around current location
          bounds = {
            north: currentLocation.lat + 0.05,
            south: currentLocation.lat - 0.05,
            east: currentLocation.lng + 0.05,
            west: currentLocation.lng - 0.05
          };
          zoomLevels = { min: 10, max: 15 };
          regionName = 'Nearby Area';
          break;
        case 'large':
          // Large region around current location
          bounds = {
            north: currentLocation.lat + 0.1,
            south: currentLocation.lat - 0.1,
            east: currentLocation.lng + 0.1,
            west: currentLocation.lng - 0.1
          };
          zoomLevels = { min: 8, max: 14 };
          regionName = 'Large Area';
          break;
        default:
          throw new Error('Unknown region type');
      }

      const regionId = `${regionType}-${Date.now()}`;

      const region = await offlineMapService.downloadRegion(
        regionId,
        regionName,
        bounds,
        zoomLevels,
        (progress) => {
          setDownloadProgress(progress);
        }
      );

      setRegions(prev => [...prev, region]);
      await loadStorageInfo();
      alert(`Successfully downloaded ${region.tiles.length} tiles for ${regionName}`);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please check your internet connection and try again.');
    } finally {
      setIsDownloading(false);
      setDownloadProgress(null);
    }
  };

  const handleDeleteRegion = async (regionId: string) => {
    try {
      await offlineMapService.deleteRegion(regionId);
      setRegions(prev => prev.filter(r => r.id !== regionId));
      await loadStorageInfo();
    } catch (error) {
      console.error('Failed to delete region:', error);
      alert('Failed to delete region');
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-bitebrain-navy rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-bitebrain-navy dark:text-bitebrain-mist">
              Offline Maps
            </h2>
            <button
              onClick={onClose}
              className="text-bitebrain-slate hover:text-bitebrain-coral"
            >
              ✕
            </button>
          </div>

          {/* Storage Info */}
          {storageInfo && (
            <div className="mb-4 p-3 bg-bitebrain-teal/10 rounded-lg">
              <div className="text-sm text-bitebrain-slate dark:text-bitebrain-mist">
                Storage: {formatBytes(storageInfo.used)} / {formatBytes(storageInfo.available)}
              </div>
              <div className="w-full bg-bitebrain-teal/20 rounded-full h-2 mt-2">
                <div
                  className="bg-bitebrain-teal h-2 rounded-full"
                  style={{ width: `${(storageInfo.used / storageInfo.available) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Download Options */}
          <div className="mb-6">
            <h3 className="font-semibold text-bitebrain-navy dark:text-bitebrain-mist mb-3">
              Download New Region
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => handleDownloadRegion('current')}
                disabled={isDownloading || !currentLocation}
                className="w-full p-3 bg-bitebrain-teal text-white rounded-lg hover:bg-bitebrain-teal/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                📍 Current Location (High Detail)
              </button>
              <button
                onClick={() => handleDownloadRegion('nearby')}
                disabled={isDownloading || !currentLocation}
                className="w-full p-3 bg-bitebrain-coral text-white rounded-lg hover:bg-bitebrain-coral/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🗺️ Nearby Area (Medium Detail)
              </button>
              <button
                onClick={() => handleDownloadRegion('large')}
                disabled={isDownloading || !currentLocation}
                className="w-full p-3 bg-bitebrain-navy text-white rounded-lg hover:bg-bitebrain-navy/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🌍 Large Area (Low Detail)
              </button>
            </div>
          </div>

          {/* Download Progress */}
          {isDownloading && downloadProgress && (
            <div className="mb-4 p-3 bg-bitebrain-teal/10 rounded-lg">
              <div className="text-sm text-bitebrain-navy dark:text-bitebrain-mist mb-2">
                Downloading tiles... ({downloadProgress.completed}/{downloadProgress.total})
              </div>
              <div className="text-xs text-bitebrain-slate dark:text-bitebrain-mist">
                Current: {downloadProgress.currentTile}
              </div>
              <div className="w-full bg-bitebrain-teal/20 rounded-full h-2 mt-2">
                <div
                  className="bg-bitebrain-teal h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(downloadProgress.completed / downloadProgress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Saved Regions */}
          <div>
            <h3 className="font-semibold text-bitebrain-navy dark:text-bitebrain-mist mb-3">
              Saved Regions ({regions.length})
            </h3>
            {regions.length === 0 ? (
              <p className="text-sm text-bitebrain-slate dark:text-bitebrain-mist">
                No offline regions saved yet.
              </p>
            ) : (
              <div className="space-y-2">
                {regions.map((region) => (
                  <div
                    key={region.id}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-bitebrain-navy/50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-bitebrain-navy dark:text-bitebrain-mist">
                        {region.name}
                      </div>
                      <div className="text-xs text-bitebrain-slate dark:text-bitebrain-mist">
                        {region.tiles.length} tiles • {formatBytes(region.sizeBytes)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteRegion(region.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-bitebrain-slate dark:text-bitebrain-mist">
              💡 <strong>Tip:</strong> Download regions when you have a good internet connection.
              Offline maps will be used automatically when you're in remote areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
