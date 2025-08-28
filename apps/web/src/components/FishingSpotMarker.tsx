import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import { FishingSpot } from '@bitebrain/core';

interface FishingSpotMarkerProps {
  spot: FishingSpot;
  onClick?: (spot: FishingSpot) => void;
}

export const FishingSpotMarker: React.FC<FishingSpotMarkerProps> = ({ spot, onClick }) => {
  const [showPopup, setShowPopup] = useState(false);

  const getMarkerColor = (type: FishingSpot['type']) => {
    switch (type) {
      case 'lake': return 'bg-blue-500';
      case 'river': return 'bg-cyan-500';
      case 'pond': return 'bg-green-500';
      case 'creek': return 'bg-teal-500';
      case 'reservoir': return 'bg-indigo-500';
      default: return 'bg-blue-500';
    }
  };

  const getMarkerIcon = (type: FishingSpot['type']) => {
    switch (type) {
      case 'lake': return '🏊';
      case 'river': return '🌊';
      case 'pond': return '💧';
      case 'creek': return '💦';
      case 'reservoir': return '🏔️';
      default: return '🎣';
    }
  };

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '✨' : '');
  };

  return (
    <>
      <Marker
        latitude={spot.latitude}
        longitude={spot.longitude}
        anchor="center"
      >
        <div
          className={`w-8 h-8 ${getMarkerColor(spot.type)} rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-white text-xs font-bold relative`}
          onClick={(e) => {
            e.stopPropagation();
            setShowPopup(!showPopup);
            onClick?.(spot);
          }}
        >
          {getMarkerIcon(spot.type)}
          {spot.rating >= 4.5 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white" />
          )}
        </div>
      </Marker>

      {showPopup && (
        <Popup
          latitude={spot.latitude}
          longitude={spot.longitude}
          anchor="bottom"
          onClose={() => setShowPopup(false)}
          closeButton={true}
          closeOnClick={false}
          maxWidth="300px"
        >
          <div className="p-3">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-bitebrain-navy text-sm">{spot.name}</h3>
              <span className="text-xs bg-bitebrain-teal/20 text-bitebrain-teal px-2 py-1 rounded">
                {spot.type}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">{getRatingStars(spot.rating)}</span>
              <span className="text-xs text-bitebrain-slate">({spot.rating}/5)</span>
            </div>

            {spot.description && (
              <p className="text-xs text-bitebrain-slate mb-2">{spot.description}</p>
            )}

            <div className="space-y-1 text-xs">
              <div>
                <span className="font-medium text-bitebrain-navy">Species: </span>
                <span className="text-bitebrain-slate">{spot.species.join(', ')}</span>
              </div>
              
              {spot.depth && (
                <div>
                  <span className="font-medium text-bitebrain-navy">Depth: </span>
                  <span className="text-bitebrain-slate">{spot.depth}</span>
                </div>
              )}
              
              {spot.structure && spot.structure.length > 0 && (
                <div>
                  <span className="font-medium text-bitebrain-navy">Structure: </span>
                  <span className="text-bitebrain-slate">{spot.structure.join(', ')}</span>
                </div>
              )}
            </div>

            <button
              className="mt-3 w-full bg-bitebrain-teal text-white text-xs py-2 px-3 rounded hover:bg-bitebrain-teal/80 transition-colors"
              onClick={() => {
                // Future: Navigate to spot details or get directions
                console.log('Get directions to:', spot.name);
              }}
            >
              Get Directions 🧭
            </button>
          </div>
        </Popup>
      )}
    </>
  );
};
