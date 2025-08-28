'use client'

import { useState, useEffect } from 'react'
import { recommend, type Conditions, type FishSpecies } from '@bitebrain/core'
import { MapView } from '../src/components/MapView'
import { WeatherDisplay } from '../src/components/WeatherDisplay'
import { SolunarCalendar } from '../src/components/SolunarCalendar'
import { WaterTempDisplay } from '../src/components/WaterTempDisplay'
import { SpeciesSelector } from '../src/components/SpeciesSelector'
import { AnimatedLogo } from '../src/components/AnimatedLogo'

interface Recommendation {
  pattern: string
  lures: string[]
  confidence: number
  species?: FishSpecies
  reasons?: string[]
  bestTimeOfDay?: string
  waterDepth?: string
  technique?: string
}

export default function HomePage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [conditions, setConditions] = useState<Conditions>({
    season: 'spring',
    wind: 'light',
    sky: 'cloudy',
    temp: 65,
    clarity: 'clear'
  })
  const [selectedSpecies, setSelectedSpecies] = useState<FishSpecies[]>(['largemouth-bass', 'smallmouth-bass', 'trout'])

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    }

    // Get recommendations
    const recs = recommend(conditions)
    setRecommendations(recs)
  }, [conditions])

  const handleWeatherUpdate = (weatherData: any) => {
    // Update conditions based on real weather data
    const newConditions = {
      season: conditions.season, // Keep season as is for now
      waterTempF: weatherData.temperature,
      windMph: weatherData.windSpeed,
      wind: weatherData.windSpeed < 5 ? 'calm' as const :
            weatherData.windSpeed < 15 ? 'light' as const :
            weatherData.windSpeed < 25 ? 'moderate' as const : 'strong' as const,
      sky: weatherData.cloudCover < 25 ? 'sunny' as const :
           weatherData.cloudCover < 75 ? 'cloudy' as const : 'mixed' as const,
      temp: weatherData.temperature,
      clarity: weatherData.precipitation === 0 ? 'clear' as const : 'stained' as const,
      targetSpecies: selectedSpecies
    }
    setConditions(newConditions)

    // Update recommendations with real weather data
    const recs = recommend(newConditions)
    setRecommendations(recs)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <AnimatedLogo />
            BiteBrain
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered fishing recommendations based on real-time conditions
          </p>
        </header>

        {/* Weather Conditions Row */}
        {location && (
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            <WeatherDisplay
              latitude={location.lat}
              longitude={location.lng}
              onWeatherUpdate={handleWeatherUpdate}
              className="h-full"
            />
            <SolunarCalendar
              latitude={location.lat}
              longitude={location.lng}
              className="h-full"
            />
            <WaterTempDisplay
              latitude={location.lat}
              longitude={location.lng}
              waterBodyType="lake"
              className="h-full"
            />
            <SpeciesSelector
              selectedSpecies={selectedSpecies}
              onSpeciesChange={setSelectedSpecies}
            />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Current Conditions Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Season</div>
                  <div className="font-semibold text-bitebrain-navy capitalize">{conditions.season}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Wind</div>
                  <div className="font-semibold text-bitebrain-navy capitalize">{conditions.wind}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Sky</div>
                  <div className="font-semibold text-bitebrain-navy capitalize">{conditions.sky}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Temperature</div>
                  <div className="font-semibold text-bitebrain-navy">{conditions.temp}°F</div>
                </div>
              </div>
              {location && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    📍 Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{rec.pattern}</h3>
                    {rec.species && (
                      <span className="text-xs bg-bitebrain-teal text-white px-2 py-1 rounded-full capitalize">
                        {rec.species.replace('-', ' ')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Confidence: {Math.round(rec.confidence * 100)}%
                  </p>
                  {rec.reasons && rec.reasons.length > 0 && (
                    <div className="mt-2 text-xs text-gray-500">
                      <strong>Why:</strong> {rec.reasons[0]}
                    </div>
                  )}
                  <ul className="mt-2 text-sm text-gray-700">
                    {rec.lures.map((lure, i) => (
                      <li key={i}>• {lure}</li>
                    ))}
                  </ul>
                  {rec.bestTimeOfDay && (
                    <div className="mt-2 text-xs text-bitebrain-teal">
                      <strong>Best Time:</strong> {rec.bestTimeOfDay}
                    </div>
                  )}
                  {rec.waterDepth && (
                    <div className="mt-1 text-xs text-bitebrain-teal">
                      <strong>Depth:</strong> {rec.waterDepth}
                    </div>
                  )}
                  {rec.technique && (
                    <div className="mt-1 text-xs text-bitebrain-teal">
                      <strong>Technique:</strong> {rec.technique}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-bitebrain-teal hover:bg-bitebrain-teal/90 text-white py-2 px-4 rounded-lg transition-colors">
                📱 Download Offline Maps
              </button>
              <button className="w-full bg-bitebrain-coral hover:bg-bitebrain-coral/90 text-white py-2 px-4 rounded-lg transition-colors">
                🎣 Log a Catch
              </button>
              <button className="w-full bg-bitebrain-navy hover:bg-bitebrain-navy/90 text-white py-2 px-4 rounded-lg transition-colors">
                📊 View Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Interactive Map</h2>
          <div className="h-96 w-full">
            <MapView
              latitude={location?.lat || 39.8283}
              longitude={location?.lng || -98.5795}
              zoom={location ? 10 : 4}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
