'use client'

import { FishSpecies } from '@bitebrain/core'

interface SpeciesSelectorProps {
  selectedSpecies: FishSpecies[]
  onSpeciesChange: (species: FishSpecies[]) => void
}

const SPECIES_OPTIONS: { value: FishSpecies; label: string; emoji: string }[] = [
  { value: 'largemouth-bass', label: 'Largemouth Bass', emoji: '🐟' },
  { value: 'smallmouth-bass', label: 'Smallmouth Bass', emoji: '🐠' },
  { value: 'trout', label: 'Trout', emoji: '🌊' },
  { value: 'walleye', label: 'Walleye', emoji: '👁️' },
  { value: 'catfish', label: 'Catfish', emoji: '🐱' },
  { value: 'panfish', label: 'Panfish', emoji: '🐟' }
]

export function SpeciesSelector({ selectedSpecies, onSpeciesChange }: SpeciesSelectorProps) {
  const handleSpeciesToggle = (species: FishSpecies) => {
    if (selectedSpecies.includes(species)) {
      onSpeciesChange(selectedSpecies.filter(s => s !== species))
    } else {
      onSpeciesChange([...selectedSpecies, species])
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Target Species</h2>
      <p className="text-sm text-gray-600 mb-4">
        Select the fish species you're targeting for more accurate recommendations
      </p>
      <div className="grid grid-cols-2 gap-3">
        {SPECIES_OPTIONS.map(({ value, label, emoji }) => (
          <button
            key={value}
            onClick={() => handleSpeciesToggle(value)}
            className={`p-3 rounded-lg border-2 transition-colors text-left ${
              selectedSpecies.includes(value)
                ? 'border-bitebrain-teal bg-bitebrain-teal/10 text-bitebrain-teal'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{emoji}</span>
              <span className="font-medium">{label}</span>
            </div>
          </button>
        ))}
      </div>
      {selectedSpecies.length === 0 && (
        <p className="text-sm text-amber-600 mt-3">
          ⚠️ Please select at least one species for recommendations
        </p>
      )}
    </div>
  )
}
