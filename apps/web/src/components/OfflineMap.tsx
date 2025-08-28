import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { offlineMapService } from '@bitebrain/core';

interface OfflineMapProps {
  mapboxToken: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  className?: string;
  onMapLoad?: (map: mapboxgl.Map) => void;
}

export const OfflineMap: React.FC<OfflineMapProps> = ({
  mapboxToken,
  latitude = 39.8283,
  longitude = -98.5795,
  zoom = 10,
  className = '',
  onMapLoad
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null); // eslint-disable-line no-unused-vars
  const [isOnline, setIsOnline] = useState(true);
  const [hasOfflineData, setHasOfflineData] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Set mapbox token
    offlineMapService.setMapboxToken(mapboxToken);

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [longitude, latitude],
      zoom: zoom,
      accessToken: mapboxToken
    });

    // Check online status
    const checkOnlineStatus = async () => {
      const online = await offlineMapService.isOnline();
      setIsOnline(online);

      if (!online) {
        // Switch to offline mode
        switchToOfflineMode();
      }
    };

    // Listen for online/offline events
    window.addEventListener('online', () => {
      setIsOnline(true);
      switchToOnlineMode();
    });

    window.addEventListener('offline', () => {
      setIsOnline(false);
      switchToOfflineMode();
    });

    map.current.on('load', () => {
      checkOnlineStatus();
      checkOfflineData();
      onMapLoad?.(map.current!);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    };
  }, [mapboxToken, latitude, longitude, zoom, onMapLoad]);

  const checkOfflineData = async () => {
    try {
      const regions = await offlineMapService.getAllRegions();
      setHasOfflineData(regions.length > 0);
    } catch (error) {
      console.error('Failed to check offline data:', error);
    }
  };

  const switchToOfflineMode = async () => {
    if (!map.current) return;

    try {
      // For now, we'll show a simplified offline view
      // In a production app, you'd implement proper tile caching with service workers
      console.log('Offline mode activated - using simplified view');
    } catch (error) {
      console.error('Failed to switch to offline mode:', error);
    }
  };

  const switchToOnlineMode = () => {
    if (!map.current) return;

    try {
      // Remove offline source and layers
      if (map.current.getLayer('offline-satellite')) {
        map.current.removeLayer('offline-satellite');
      }
      if (map.current.getSource('offline-satellite')) {
        map.current.removeSource('offline-satellite');
      }

      // Add back online satellite source
      map.current.addSource('satellite', {
        type: 'raster',
        url: 'mapbox://mapbox.satellite',
        tileSize: 256
      });

      map.current.addLayer({
        id: 'satellite',
        type: 'raster',
        source: 'satellite',
        paint: { 'raster-opacity': 0.7 }
      });

      console.log('Switched to online mode');
    } catch (error) {
      console.error('Failed to switch to online mode:', error);
    }
  };

  return (
    <div className={`${className} relative overflow-hidden rounded-lg border border-bitebrain-teal/20`}>
      <div ref={mapContainer} className="w-full h-full" />

      {/* Status Indicator */}
      <div className="absolute top-2 left-2 bg-bitebrain-navy/80 text-bitebrain-mist px-2 py-1 rounded text-xs">
        {isOnline ? '🟢 Online' : hasOfflineData ? '🟡 Offline (Cached)' : '🔴 Offline (No Cache)'}
      </div>

      {/* Offline Notice */}
      {!isOnline && !hasOfflineData && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-bitebrain-navy p-6 rounded-lg shadow-lg max-w-sm text-center">
            <div className="text-4xl mb-3">📴</div>
            <h3 className="font-semibold text-bitebrain-navy dark:text-bitebrain-mist mb-2">
              You're Offline
            </h3>
            <p className="text-sm text-bitebrain-slate dark:text-bitebrain-mist mb-3">
              No offline maps available for this area. Download maps when you have internet connection.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
