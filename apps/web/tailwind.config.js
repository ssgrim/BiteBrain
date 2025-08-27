/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // BiteBrain Brand Colors
        'primary-navy': '#0B132B',
        'sea-teal': '#2EC4B6',
        'brain-coral': '#FF6B6B',
        'zombie-lime': '#B8E986',
        'bitebrain': {
          navy: '#0B132B',
          teal: '#2EC4B6',
          coral: '#FF6B6B',
          lime: '#B8E986',
          slate: '#334155',
          mist: '#EEF2F7',
        },
      },
      backgroundImage: {
        'lake-light': "url('/assets/wallpapers/bitebrain-light-3840x2160.svg')",
        'lake-dark': "url('/assets/wallpapers/bitebrain-dark-3840x2160.svg')",
        'ripples': "url('/assets/patterns/ripples-tile.svg')",
      },
    },
  },
  plugins: [],
}
