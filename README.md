# TIPIDON LIVE — Complete Build

This is the consolidated prototype based on the requested features.

## Included
- Hacker/command-center UI
- Interactive world map
- MAP / SATELLITE / HYBRID / STREET modes
- Satellite/aerial imagery
- Roads and place labels over imagery
- Location search
- Coordinate search
- Click-to-investigate locations
- Own-device GPS (permission required)
- Public street imagery lookup where coverage exists
- IP geolocation lookup (approximate)
- NASA Earth-observation and cloud overlays
- Adaptive LOW/NORMAL/HIGH data mode
- Mobile layout
- Status/telemetry UI

## Important reality
A public webpage cannot turn an ordinary satellite into a continuous live camera. Satellite layers have observation/update times. Street imagery is public imagery where available.

IP geolocation is approximate and must not be presented as an exact device address.

## Before commercial launch
This prototype uses public/external services. Review each provider's current terms, attribution and rate limits. OpenStreetMap's standard tile server and Nominatim have usage restrictions; commercial/high-volume deployments should use an appropriate provider or self-hosted infrastructure. NASA GIBS is intended for Earth-observation visualization. Esri services have separate commercial licensing terms.

## GitHub Pages
Replace the current index.html, style.css and app.js with these files. GitHub Pages will publish the static site.

For a real paid product, add a backend/API, authentication, database, payment provider, rate limiting, caching/CDN, provider keys stored server-side, privacy policy and terms of service.
