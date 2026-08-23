# TIPIDON LIVE SATELLITE

A free GitHub Pages starter for a live-updating Earth-observation map.

## Deploy

1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, and `app.js` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.
7. Open the GitHub Pages URL after deployment.

No API key is required for the NASA GIBS imagery used by this starter.

## What this version does

- Interactive world map
- NASA GIBS satellite imagery layer
- NASA GIBS cloud layer
- Automatic browser refresh every 15 minutes
- Location search using OpenStreetMap Nominatim
- Browser geolocation
- Mobile/desktop layout

## Important limitation

This is not a continuous live camera from orbit. Earth-observation satellites only provide imagery when the relevant satellite product has an observation available. The page refreshes its data connection automatically, but it cannot create observations that the satellite has not transmitted.

For a production system with true server-side live events, aircraft/vessel feeds, historical archives, AI change detection, user accounts, alerts and higher-resolution/commercial imagery, add a backend and additional data providers.

## Sources

NASA GIBS: https://gibs.earthdata.nasa.gov/
NASA Earthdata: https://www.earthdata.nasa.gov/
OpenStreetMap: https://www.openstreetmap.org/
