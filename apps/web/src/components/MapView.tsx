import React, { useRef, useEffect, useState } from 'react';
import Map, { NavigationControl, GeolocateControl, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FallbackMap } from './FallbackMap';
import { FishingSpotMarker } from './FishingSpotMarker';
import { OfflineDownloadInterface } from './OfflineDownloadInterface';
import { OfflineMap } from './OfflineMap';
import { getFishingSpotsInRadius, FishingSpot, offlineMapService } from '@bitebrain/core';

interface MapViewProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  className?: string;
}

interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
}

export const MapView: React.FC<MapViewProps> = ({
  latitude = 39.8283, // Default to center of US
  longitude = -98.5795,
  zoom = 4,
  className = '',
}) => {
  const mapRef = useRef<any>(null);
  const [viewState, setViewState] = useState<ViewState>({
    latitude,
    longitude,
    zoom,
  });
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [fishingSpots, setFishingSpots] = useState<FishingSpot[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<FishingSpot | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [showOfflineInterface, setShowOfflineInterface] = useState(false);
  const [hasOfflineData, setHasOfflineData] = useState(false);

  // Get user's current location and nearby fishing spots
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          setUserLocation({ lat: userLat, lng: userLng });
          
          // Center map on user location
          setViewState({
            latitude: userLat,
            longitude: userLng,
            zoom: 10,
          });

          // Load nearby fishing spots (within 50km)
          const nearbySpots = getFishingSpotsInRadius(userLat, userLng, 50);
          setFishingSpots(nearbySpots);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Load all sample spots if geolocation fails
          const allSpots = getFishingSpotsInRadius(latitude, longitude, 1000);
          setFishingSpots(allSpots);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } else {
      // Load all sample spots if geolocation not available
      const allSpots = getFishingSpotsInRadius(latitude, longitude, 1000);
      setFishingSpots(allSpots);
    }
  }, [latitude, longitude]);

  // Offline detection and data checking
  useEffect(() => {
    const checkOfflineStatus = async () => {
      const online = await offlineMapService.isOnline();
      setIsOffline(!online);
    };

    const checkOfflineData = async () => {
      try {
        const regions = await offlineMapService.getAllRegions();
        setHasOfflineData(regions.length > 0);
      } catch (error) {
        console.error('Failed to check offline data:', error);
      }
    };

    // Initial checks
    checkOfflineStatus();
    checkOfflineData();

    // Listen for online/offline events
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleMapClick = (event: any) => {
    const { lng, lat } = event.lngLat;
    console.log('Map clicked at:', { lng, lat });
    // Future: Add fishing spot markers here
  };

  // Custom map style emphasizing water bodies
  const mapStyle = {
    version: 8,
    sources: {
      'mapbox-satellite': {
        type: 'raster',
        url: 'mapbox://mapbox.satellite',
        tileSize: 256,
      },
      'mapbox-terrain': {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      },
    },
    layers: [
      {
        id: 'satellite',
        type: 'raster',
        source: 'mapbox-satellite',
        layout: { visibility: 'visible' },
        paint: { 'raster-opacity': 0.7 },
      },
    ],
  };

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // If offline with cached data, use OfflineMap
  if (isOffline && hasOfflineData && mapboxToken) {
    return (
      <div className={`${className} relative overflow-hidden rounded-lg border border-bitebrain-teal/20`}>
        <OfflineMap
          mapboxToken={mapboxToken}
          latitude={viewState.latitude}
          longitude={viewState.longitude}
          zoom={viewState.zoom}
          className="w-full h-full"
        />

        {/* Offline Download Button */}
        <button
          onClick={() => setShowOfflineInterface(true)}
          className="absolute top-4 right-4 w-10 h-10 bg-bitebrain-navy/90 hover:bg-bitebrain-navy text-white rounded-lg shadow-lg flex items-center justify-center"
          title="Manage Offline Maps"
        >
          📥
        </button>

        {/* Fishing Spot Markers on Offline Map */}
        {fishingSpots.map((spot) => (
          <FishingSpotMarker
            key={spot.id}
            spot={spot}
            onClick={(spot) => setSelectedSpot(spot)}
          />
        ))}

        {/* Offline Download Interface */}
        <OfflineDownloadInterface
          isOpen={showOfflineInterface}
          onClose={() => setShowOfflineInterface(false)}
          mapboxToken={mapboxToken}
          currentLocation={userLocation ? { lat: userLocation.lat, lng: userLocation.lng } : undefined}
        />
      </div>
    );
  }

  if (!mapboxToken || mapboxToken.trim() === '') {
    return (
      <FallbackMap
        className={className}
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
      />
    );
  }

  return (
    <div className={`${className} relative overflow-hidden rounded-lg border border-bitebrain-teal/20`}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={handleMapClick}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        attributionControl={false}
        style={{ width: '100%', height: '100%' }}
        maxZoom={20}
        minZoom={2}
      >
        {/* Navigation Controls */}
        <NavigationControl position="top-right" />
        
        {/* Geolocation Control */}
        <GeolocateControl
          position="top-right"
          trackUserLocation={true}
          showUserHeading={true}
          showAccuracyCircle={true}
        />

        {/* Offline Download Button */}
        <button
          onClick={() => setShowOfflineInterface(true)}
          className="absolute top-16 right-4 w-10 h-10 bg-bitebrain-navy/90 hover:bg-bitebrain-navy text-white rounded-lg shadow-lg flex items-center justify-center z-10"
          title="Download Offline Maps"
        >
          📥
        </button>

        {/* Fishing Spot Markers */}
        {fishingSpots.map((spot) => (
          <FishingSpotMarker
            key={spot.id}
            spot={spot}
            onClick={(spot) => setSelectedSpot(spot)}
          />
        ))}

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            latitude={userLocation.lat}
            longitude={userLocation.lng}
            anchor="center"
          >
            <div 
              className="w-4 h-4 bg-bitebrain-coral rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
              onClick={() => setShowPopup(!showPopup)}
            />
          </Marker>
        )}

        {/* User Location Popup */}
        {userLocation && showPopup && (
          <Popup
            latitude={userLocation.lat}
            longitude={userLocation.lng}
            anchor="bottom"
            onClose={() => setShowPopup(false)}
            closeButton={true}
            closeOnClick={false}
          >
            <div className="p-2 text-sm">
              <p className="font-semibold text-bitebrain-navy">Your Location</p>
              <p className="text-bitebrain-slate">
                {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </p>
              <p className="text-xs text-bitebrain-teal mt-1">
                Perfect for fishing recommendations!
              </p>
            </div>
          </Popup>
        )}
      </Map>

      {/* Loading Overlay */}
      <div className="absolute top-2 left-2 bg-bitebrain-navy/80 text-bitebrain-mist px-2 py-1 rounded text-xs">
        BiteBrain Map v1.0
      </div>

      {/* Offline Download Interface */}
      <OfflineDownloadInterface
        isOpen={showOfflineInterface}
        onClose={() => setShowOfflineInterface(false)}
        mapboxToken={mapboxToken}
        currentLocation={userLocation ? { lat: userLocation.lat, lng: userLocation.lng } : undefined}
      />
    </div>
  );
};
