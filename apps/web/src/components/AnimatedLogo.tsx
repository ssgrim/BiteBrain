'use client'

import { useEffect, useState } from 'react'

export function AnimatedLogo() {
  const [svgContent, setSvgContent] = useState<string>('')

  useEffect(() => {
    // Load the SVG content
    fetch('/assets/icons/zombie-fish-detailed.svg')
      .then(response => response.text())
      .then(content => setSvgContent(content))
      .catch(error => console.error('Failed to load logo SVG:', error))
  }, [])

  if (!svgContent) {
    return <span className="text-4xl">🎣</span> // Fallback emoji while loading
  }

  return (
    <div
      className="inline-block w-12 h-8"
      dangerouslySetInnerHTML={{ __html: svgContent }}
      style={{ filter: 'brightness(0) saturate(100%)' }} // Make it dark to match text
    />
  )
}
