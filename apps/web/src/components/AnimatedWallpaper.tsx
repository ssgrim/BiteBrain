'use client'

import { useEffect, useState } from 'react'

interface AnimatedWallpaperProps {
  variant?: 'light' | 'dark'
  className?: string
}

export function AnimatedWallpaper({ variant = 'light', className = '' }: AnimatedWallpaperProps) {
  const [svgContent, setSvgContent] = useState<string>('')

  useEffect(() => {
    // Load the SVG content
    const wallpaperPath = variant === 'dark'
      ? '/assets/wallpapers/dark-1280x720.svg'
      : '/assets/wallpapers/light-1280x720.svg'

    fetch(wallpaperPath)
      .then(response => response.text())
      .then(content => setSvgContent(content))
      .catch(error => console.error('Failed to load wallpaper SVG:', error))
  }, [variant])

  if (!svgContent) {
    return (
      <div className={`bg-gradient-to-b from-blue-400 to-blue-600 ${className}`}>
        <div className="w-full h-full bg-gradient-to-b from-blue-300/20 to-transparent"></div>
      </div>
    )
  }

  return (
    <div
      className={`absolute inset-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  )
}
