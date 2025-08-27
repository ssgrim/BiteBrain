# BiteBrain Branding Guide

This document outlines the visual identity and branding guidelines for the BiteBrain AI Fishing Assistant.

## 🎨 Color Palette

The BiteBrain brand uses a carefully selected palette inspired by aquatic environments and AI technology:

### Primary Colors
- **Primary Navy** `#0B132B` - Main brand color, deep water inspiration
- **Sea Teal** `#2EC4B6` - Accent color, tropical waters
- **Brain Coral** `#FF6B6B` - Attention color, coral reef inspiration
- **Zombie Lime** `#B8E986` - Success/development color, algae inspiration

### Supporting Colors
- **Slate** `#334155` - Text and UI elements
- **Mist** `#EEF2F7` - Light backgrounds and subtle elements
- **Black** `#000000` - High contrast text
- **White** `#FFFFFF` - Clean backgrounds

### Tailwind CSS Classes
```css
/* Brand colors available in web app */
.text-bitebrain-navy { color: #0B132B; }
.text-bitebrain-teal { color: #2EC4B6; }
.text-bitebrain-coral { color: #FF6B6B; }
.text-bitebrain-lime { color: #B8E986; }
.text-bitebrain-slate { color: #334155; }
.text-bitebrain-mist { color: #EEF2F7; }

/* Background utilities */
.bg-lake-light { background-image: url('/assets/wallpapers/bitebrain-light-3840x2160.svg'); }
.bg-lake-dark { background-image: url('/assets/wallpapers/bitebrain-dark-3840x2160.svg'); }
.bg-ripples { background-image: url('/assets/patterns/ripples-tile.svg'); }
```

## 🐟 Logo Variations

### Icons
Located in `/assets/branding/icons/`

- **icon-a-minimal-fish.svg** - Clean, minimal fish silhouette (primary icon)
- **icon-b-zombie-fish.svg** - Stylized fish with personality
- **icon-c-fish-skeleton-brain.svg** - Technical/AI-focused design
- **icon-d-bb-hook.svg** - "BB" initials in fishing hook style

### Wordmarks
Located in `/assets/branding/wordmarks/`

- **wordmark-horizontal.svg** - Full logo for headers and wide spaces
- **wordmark-badge.svg** - Compact version for buttons and small spaces

### Usage Guidelines
- Use **icon-a-minimal-fish.svg** for app icons and favicons
- Use **wordmark-horizontal.svg** for main navigation and headers
- Use **wordmark-badge.svg** for loading screens and compact layouts
- Maintain clear space around logos equal to the height of the icon

## 🌊 Background Assets

### Wallpapers
Located in `/assets/branding/wallpapers/`

All wallpapers feature subtle lake/river scenes designed to not interfere with UI elements:

- **bitebrain-light-3840x2160.svg** - 4K light theme background
- **bitebrain-dark-3840x2160.svg** - 4K dark theme background
- **bitebrain-light-2560x1440.svg** - 1440p light theme
- **bitebrain-dark-2560x1440.svg** - 1440p dark theme
- **bitebrain-light-1080x1920.svg** - Mobile portrait light
- **bitebrain-dark-1080x1920.svg** - Mobile portrait dark

### Patterns
- **ripples-tile.svg** - Seamless water ripple pattern for subtle texture

### Implementation
```css
/* Web app background with overlay */
.app-background {
  background-image: url('/assets/wallpapers/bitebrain-light-3840x2160.svg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

/* Add subtle overlay for better text readability */
.app-background::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(11, 19, 43, 0.1); /* primary-navy with opacity */
  pointer-events: none;
}
```

## 📱 Platform-Specific Usage

### Web Application
- Favicon: `/public/favicon.svg` (icon-a-minimal-fish.svg)
- Header logo: wordmark-horizontal.svg
- Background: Lake wallpapers with opacity overlays
- Colors: Full Tailwind palette integration

### Mobile Application
- App icon: icon-a-minimal-fish.svg
- Splash screen: wordmark-badge.svg with brand colors
- Navigation: Compact icons and wordmark-badge.svg
- Colors: Inline styles using hex values

### Development Environment
- Development banner uses **zombie-lime** background
- Error states use **brain-coral** for attention
- Success states use **sea-teal** for confirmation

## 🎯 Brand Personality

BiteBrain's visual identity should convey:
- **Intelligence**: Clean, modern design with subtle AI references
- **Expertise**: Professional fishing terminology and accurate data
- **Adventure**: Natural water environments and outdoor inspiration
- **Reliability**: Consistent colors and predictable interface patterns

## 📐 Technical Specifications

### File Formats
- **SVG**: Primary format for all logos and icons (scalable, small file size)
- **JSON**: Color palette definitions for programmatic access

### Asset Organization
```
/assets/branding/
├── icons/           # App icons and symbols
├── wordmarks/       # Full logos with text
├── wallpapers/      # Background images
├── patterns/        # Repeatable textures
├── colors/          # Color palette definitions
└── README_*.md      # Usage documentation
```

### Web Optimization
- SVGs are optimized for web delivery
- Tailwind classes use exact brand color values
- Background images use CSS `background-size: cover` for responsiveness
- Dark/light theme variants available

### Mobile Optimization
- SVG icons work with React Native
- Color values defined as constants in styles
- Expo app.json configured with proper icon references

## 🚀 Implementation Checklist

- [x] Color palette integrated into Tailwind CSS
- [x] Favicon and app icons configured
- [x] Header logo implemented in web app
- [x] Background wallpapers applied with overlays
- [x] Development banner styled with brand colors
- [x] Mobile app icon and splash screen configured
- [x] Brand colors applied to UI components
- [x] Documentation created for consistent usage

## 🔄 Future Enhancements

Planned branding improvements for upcoming sprints:
- [ ] Animated logo variants for loading states
- [ ] Additional icon variations for specific features
- [ ] Brand photography for marketing materials
- [ ] Accessibility color contrast validation
- [ ] Print-ready logo formats for merchandise
