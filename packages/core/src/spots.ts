import { FishingSpot } from './types';

// Sample fishing spots for development and testing
export const SAMPLE_FISHING_SPOTS: FishingSpot[] = [
  {
    id: 'spot-001',
    name: 'Bass Cove',
    latitude: 39.8283,
    longitude: -98.5795,
    type: 'lake',
    species: ['Largemouth Bass', 'Bluegill', 'Crappie'],
    rating: 4.5,
    description: 'Excellent bass fishing spot with good structure and cover',
    depth: '10-25 feet',
    structure: ['fallen trees', 'rock piles', 'weed beds'],
    isPublic: true,
  },
  {
    id: 'spot-002',
    name: 'Trout Run',
    latitude: 40.0150,
    longitude: -105.2705,
    type: 'river',
    species: ['Rainbow Trout', 'Brown Trout'],
    rating: 4.2,
    description: 'Fast-flowing mountain stream perfect for fly fishing',
    depth: '2-8 feet',
    structure: ['rapids', 'pools', 'undercut banks'],
    isPublic: true,
  },
  {
    id: 'spot-003',
    name: 'Hidden Pond',
    latitude: 34.0522,
    longitude: -118.2437,
    type: 'pond',
    species: ['Bluegill', 'Catfish'],
    rating: 3.8,
    description: 'Small urban pond, great for beginners',
    depth: '3-12 feet',
    structure: ['dock', 'lily pads'],
    isPublic: true,
  },
  {
    id: 'spot-004',
    name: 'Eagle Lake',
    latitude: 44.9778,
    longitude: -93.2650,
    type: 'lake',
    species: ['Walleye', 'Northern Pike', 'Largemouth Bass'],
    rating: 4.8,
    description: 'Premier fishing destination with multiple species',
    depth: '15-60 feet',
    structure: ['drop-offs', 'weed lines', 'rocky points'],
    isPublic: true,
  },
  {
    id: 'spot-005',
    name: 'Crystal Creek',
    latitude: 47.6062,
    longitude: -122.3321,
    type: 'creek',
    species: ['Salmon', 'Steelhead'],
    rating: 4.0,
    description: 'Seasonal run of salmon and steelhead',
    depth: '1-6 feet',
    structure: ['gravel beds', 'log jams'],
    isPublic: true,
  },
];

export const getFishingSpots = (): FishingSpot[] => {
  return SAMPLE_FISHING_SPOTS;
};

export const getFishingSpotsInRadius = (
  centerLat: number,
  centerLng: number,
  radiusKm: number
): FishingSpot[] => {
  return SAMPLE_FISHING_SPOTS.filter(spot => {
    const distance = getDistanceKm(centerLat, centerLng, spot.latitude, spot.longitude);
    return distance <= radiusKm;
  });
};

export const getFishingSpotById = (id: string): FishingSpot | undefined => {
  return SAMPLE_FISHING_SPOTS.find(spot => spot.id === id);
};

// Calculate distance between two points in kilometers
function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
