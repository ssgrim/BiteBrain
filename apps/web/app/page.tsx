'use client'

import { useState, useEffect } from 'react'
import { recommend } from '@bitebrain/core'

interface Recommendation {
  pattern: string
  lures: string[]
  confidence: number
}

export default function HomePage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [conditions, setConditions] = useState({
    season: 'spring' as const,
    wind: 'light' as const,
    sky: 'cloudy' as const,
    temp: 65,
    clarity: 'clear' as const
  })

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎣 BiteBrain
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered fishing recommendations based on conditions and your tackle
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Current Conditions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Season</label>
                <select 
                  value={conditions.season}
                  onChange={(e) => setConditions({...conditions, season: e.target.value as any})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                  <option value="winter">Winter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Wind</label>
                <select 
                  value={conditions.wind}
                  onChange={(e) => setConditions({...conditions, wind: e.target.value as any})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="calm">Calm</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="strong">Strong</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Temperature (°F)</label>
                <input 
                  type="number"
                  value={conditions.temp}
                  onChange={(e) => setConditions({...conditions, temp: parseInt(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
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

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-medium text-gray-900">{rec.pattern}</h3>
                  <p className="text-sm text-gray-600">
                    Confidence: {Math.round(rec.confidence * 100)}%
                  </p>
                  <ul className="mt-2 text-sm text-gray-700">
                    {rec.lures.map((lure, i) => (
                      <li key={i}>• {lure}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Map View</h2>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">🗺️ Interactive map coming soon</p>
          </div>
        </div>
      </div>
    </main>
  )
}
