# BiteBrain Wallpaper Pack

Subtle, non-distracting lake/river backgrounds designed for UI overlays.

## Files
- wallpapers/bitebrain-light-3840x2160.svg
- wallpapers/bitebrain-dark-3840x2160.svg
- wallpapers/bitebrain-light-2560x1440.svg
- wallpapers/bitebrain-dark-2560x1440.svg
- wallpapers/bitebrain-light-1080x1920.svg (mobile portrait)
- wallpapers/bitebrain-dark-1080x1920.svg (mobile portrait)
- patterns/ripples-tile.svg (seamless subtle ripple pattern)

## Tips
- Use **light** for bright UIs; **dark** for dashboards or night mode.
- SVG scales cleanly—set as CSS background with `background-size: cover`.
- Consider adding a translucent overlay in-app: `rgba(11,19,43,0.2)` for dark mode.

## CSS Example
```css
.app-bg {
  background-image: url('wallpapers/bitebrain-dark-3840x2160.svg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
/* Optional overlay */
.app-bg::before {
  content: "";
  position: absolute; inset: 0;
  background: rgba(11,19,43,0.20);
  pointer-events: none;
}
```
