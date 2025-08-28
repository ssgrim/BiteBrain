import React, { useState, useEffect } from 'react';
import { getFishingSpotsInRadius, FishingSpot } from '@bitebrain/core';

interface FallbackMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  className?: string;
}

export const FallbackMap: React.FC<FallbackMapProps> = ({
  latitude = 39.8283,
  longitude = -98.5795,
  zoom = 4,
  className = '',
}) => {
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: latitude, lng: longitude });
  const [fishingSpots, setFishingSpots] = useState<FishingSpot[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<FishingSpot | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          setUserLocation({ lat: userLat, lng: userLng });
          setMapCenter({ lat: userLat, lng: userLng });

          // Load nearby fishing spots
          const nearbySpots = getFishingSpotsInRadius(userLat, userLng, 50);
          setFishingSpots(nearbySpots);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          // Load sample spots around default location
          const spots = getFishingSpotsInRadius(latitude, longitude, 1000);
          setFishingSpots(spots);
        }
      );
    } else {
      // Load sample spots around default location
      const spots = getFishingSpotsInRadius(latitude, longitude, 1000);
      setFishingSpots(spots);
    }
  }, [latitude, longitude]);

  return (
    <div className={`${className} relative overflow-hidden rounded-lg border border-bitebrain-teal/20 bg-gradient-to-br from-bitebrain-teal/10 to-bitebrain-navy/10`}>
      {/* Map Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(46, 196, 182, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(46, 196, 182, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Water Bodies Simulation */}
        <div className="absolute top-1/4 left-1/3 w-20 h-12 bg-bitebrain-teal/30 rounded-full transform rotate-12" />
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-bitebrain-teal/40 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-32 h-6 bg-blue-400/30 rounded-full transform -rotate-45" />
        
        {/* Fishing Spot Markers Simulation */}
        {fishingSpots.slice(0, 3).map((spot, index) => (
          <div
            key={spot.id}
            className={`absolute w-3 h-3 bg-bitebrain-teal rounded-full border border-white shadow-sm cursor-pointer hover:scale-125 transition-transform`}
            style={{
              top: `${25 + index * 20}%`,
              left: `${30 + index * 15}%`,
            }}
            onClick={() => setSelectedSpot(spot)}
          >
            <div className="absolute -top-6 -left-4 text-xs bg-bitebrain-navy/80 text-white px-1 py-0.5 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
              {spot.name}
            </div>
          </div>
        ))}

        {/* User Location Marker */}
        {userLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-bitebrain-coral rounded-full border-2 border-white shadow-lg animate-pulse" />
            <div className="absolute -top-8 -left-8 text-xs bg-bitebrain-navy/80 text-white px-2 py-1 rounded whitespace-nowrap">
              You are here
            </div>
          </div>
        )}
      </div>

      {/* Map Controls Simulation */}
      <div className="absolute top-4 right-4 space-y-2">
        <button className="w-8 h-8 bg-white/90 hover:bg-white rounded shadow-md flex items-center justify-center text-bitebrain-navy text-sm font-bold">
          +
        </button>
        <button className="w-8 h-8 bg-white/90 hover:bg-white rounded shadow-md flex items-center justify-center text-bitebrain-navy text-sm font-bold">
          −
        </button>
        <button className="w-8 h-8 bg-white/90 hover:bg-white rounded shadow-md flex items-center justify-center text-bitebrain-teal">
          📍
        </button>
      </div>

      {/* Information Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/95 dark:bg-bitebrain-navy/95 p-6 rounded-lg shadow-lg border border-bitebrain-teal/30 max-w-sm text-center">
          <div className="text-4xl mb-3">🗺️</div>
          <h3 className="font-semibold text-bitebrain-navy dark:text-bitebrain-mist mb-2">
            Interactive Map Ready!
          </h3>
          <p className="text-sm text-bitebrain-slate dark:text-bitebrain-mist mb-3">
            Add your Mapbox token to see real maps with satellite imagery and detailed water bodies.
          </p>
          <div className="text-xs text-bitebrain-coral bg-bitebrain-coral/10 px-3 py-2 rounded">
            <strong>Setup:</strong> Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local
          </div>
          {userLocation && (
            <div className="mt-3 text-xs text-bitebrain-teal">
              📍 Location detected: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </div>
          )}
        </div>
      </div>

      {/* Spot Details Modal */}
      {selectedSpot && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="bg-white dark:bg-bitebrain-navy p-4 rounded-lg shadow-xl max-w-sm mx-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-bitebrain-navy dark:text-bitebrain-mist">
                {selectedSpot.name}
              </h3>
              <button
                onClick={() => setSelectedSpot(null)}
                className="text-bitebrain-slate hover:text-bitebrain-coral"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-bitebrain-slate dark:text-bitebrain-mist mb-2">
              {selectedSpot.description}
            </p>
            <div className="text-xs space-y-1">
              <div>
                <span className="font-medium">Species:</span> {selectedSpot.species.join(', ')}
              </div>
              <div>
                <span className="font-medium">Rating:</span> {'⭐'.repeat(Math.floor(selectedSpot.rating))} ({selectedSpot.rating}/5)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Version Badge */}
      <div className="absolute top-2 left-2 bg-bitebrain-navy/80 text-bitebrain-mist px-2 py-1 rounded text-xs">
        BiteBrain Map v1.0 (Demo Mode)
      </div>
    </div>
  );
};
