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
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/assets/wordmarks/wordmark-horizontal.svg" 
              alt="BiteBrain" 
              className="h-16 w-auto"
            />
          </div>
          <p className="text-lg text-bitebrain-slate dark:text-bitebrain-mist">
            AI-powered fishing recommendations based on conditions and your tackle
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Current Conditions */}
          <div className="bg-white/90 dark:bg-bitebrain-navy/90 rounded-lg shadow-lg p-6 backdrop-blur-sm border border-bitebrain-teal/20">
            <h2 className="text-xl font-semibold mb-4 text-bitebrain-navy dark:text-bitebrain-mist">Current Conditions</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-bitebrain-slate dark:text-bitebrain-mist">Season</label>
                <select 
                  value={conditions.season}
                  onChange={(e) => setConditions({...conditions, season: e.target.value as any})}
                  className="mt-1 block w-full rounded-md border-bitebrain-teal/30 shadow-sm bg-white dark:bg-bitebrain-slate text-bitebrain-navy dark:text-bitebrain-mist"
                >
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                  <option value="winter">Winter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-bitebrain-slate dark:text-bitebrain-mist">Wind</label>
                <select 
                  value={conditions.wind}
                  onChange={(e) => setConditions({...conditions, wind: e.target.value as any})}
                  className="mt-1 block w-full rounded-md border-bitebrain-teal/30 shadow-sm bg-white dark:bg-bitebrain-slate text-bitebrain-navy dark:text-bitebrain-mist"
                >
                  <option value="calm">Calm</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="strong">Strong</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-bitebrain-slate dark:text-bitebrain-mist">Temperature (°F)</label>
                <input 
                  type="number"
                  value={conditions.temp}
                  onChange={(e) => setConditions({...conditions, temp: parseInt(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-bitebrain-teal/30 shadow-sm bg-white dark:bg-bitebrain-slate text-bitebrain-navy dark:text-bitebrain-mist"
                />
              </div>
              {location && (
                <div className="mt-4 p-3 bg-bitebrain-teal/10 border border-bitebrain-teal/30 rounded-md">
                  <p className="text-sm text-bitebrain-teal">
                    📍 Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white/90 dark:bg-bitebrain-navy/90 rounded-lg shadow-lg p-6 backdrop-blur-sm border border-bitebrain-coral/20">
            <h2 className="text-xl font-semibold mb-4 text-bitebrain-navy dark:text-bitebrain-mist">AI Recommendations</h2>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border-l-4 border-bitebrain-coral pl-4">
                  <h3 className="font-medium text-bitebrain-navy dark:text-bitebrain-mist">{rec.pattern}</h3>
                  <p className="text-sm text-bitebrain-slate dark:text-bitebrain-lime">
                    Confidence: {Math.round(rec.confidence * 100)}%
                  </p>
                  <ul className="mt-2 text-sm text-bitebrain-slate dark:text-bitebrain-mist">
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
        <div className="mt-8 bg-white/90 dark:bg-bitebrain-navy/90 rounded-lg shadow-lg p-6 backdrop-blur-sm border border-bitebrain-teal/20">
          <h2 className="text-xl font-semibold mb-4 text-bitebrain-navy dark:text-bitebrain-mist">Map View</h2>
          <div className="h-64 bg-bitebrain-mist/50 dark:bg-bitebrain-slate/50 rounded-lg flex items-center justify-center border-2 border-dashed border-bitebrain-teal/30">
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-bitebrain-slate dark:text-bitebrain-mist">Interactive map coming soon</p>
              <p className="text-sm text-bitebrain-teal mt-1">Sprint 1: Story 1.1.1</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
