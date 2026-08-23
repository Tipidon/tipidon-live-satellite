const map = L.map("map", { zoomControl: true }).setView([6.5244, 3.3792], 7);

const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  maxZoom: 20,
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
});

let imagery = null;
let clouds = null;
let marker = null;

function utcDate(daysAgo = 0) {
  const d = new Date(Date.now() - daysAgo * 86400000);
  return d.toISOString().slice(0,10);
}

/*
 NASA GIBS provides map tiles from public Earth-observation products.
 We use WMS so the browser can request the imagery directly without
 exposing any private API key.
*/
function addSatelliteLayer(date) {
  if (imagery) map.removeLayer(imagery);
  imagery = L.tileLayer.wms(
    "https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi",
    {
      layers: "MODIS_Terra_CorrectedReflectance_TrueColor",
      format: "image/jpeg",
      transparent: false,
      version: "1.1.1",
      time: date,
      attribution: "NASA GIBS"
    }
  );
  if (document.getElementById("sat").checked) imagery.addTo(map);
}

function addCloudLayer(date) {
  if (clouds) map.removeLayer(clouds);
  clouds = L.tileLayer.wms(
    "https://gibs.earthdata.nasa.gov/wms/epsg3857/nrt/wms.cgi",
    {
      layers: "MODIS_Terra_Cloud_Optical_Thickness",
      format: "image/png",
      transparent: true,
      version: "1.1.1",
      time: date,
      opacity: 0.55,
      attribution: "NASA GIBS"
    }
  );
  if (document.getElementById("clouds").checked) clouds.addTo(map);
}

function refreshData() {
  // Prefer today's observation; GIBS will request the selected date.
  // The timestamp is deliberately shown so users know when this page refreshed.
  const date = utcDate(0);
  addSatelliteLayer(date);
  addCloudLayer(date);
  document.getElementById("updated").textContent =
    new Date().toLocaleString();
  document.getElementById("statusText").textContent = "LIVE";
}

function setBase(value) {
  if (value === "dark") {
    map.removeLayer(street);
    dark.addTo(map);
  } else {
    map.removeLayer(dark);
    street.addTo(map);
  }
}

document.getElementById("sat").addEventListener("change", e => {
  if (!imagery) return;
  e.target.checked ? imagery.addTo(map) : map.removeLayer(imagery);
});

document.getElementById("clouds").addEventListener("change", e => {
  if (!clouds) return;
  e.target.checked ? clouds.addTo(map) : map.removeLayer(clouds);
});

document.querySelectorAll('input[name="base"]').forEach(el =>
  el.addEventListener("change", e => setBase(e.target.value))
);

document.getElementById("refresh").addEventListener("click", refreshData);

document.getElementById("locate").addEventListener("click", () => {
  map.locate({setView:true, maxZoom:15, enableHighAccuracy:true});
});

map.on("locationfound", e => {
  if (marker) map.removeLayer(marker);
  marker = L.marker(e.latlng).addTo(map)
    .bindPopup(`Your browser-reported location<br>${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`)
    .openPopup();
});

map.on("locationerror", () => {
  alert("Location permission was denied or your browser could not determine your location.");
});

async function searchLocation(q) {
  const parts = q.split(",").map(x => Number(x.trim()));
  if (parts.length === 2 && parts.every(Number.isFinite)) {
    map.setView(parts, 12);
    if (marker) map.removeLayer(marker);
    marker = L.marker(parts).addTo(map).bindPopup("Selected coordinates").openPopup();
    return;
  }

  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(q)}`;
  const res = await fetch(url, {headers: {"Accept":"application/json"}});
  const data = await res.json();
  if (!data.length) return alert("Location not found.");
  const lat = Number(data[0].lat), lon = Number(data[0].lon);
  map.setView([lat, lon], 12);
  if (marker) map.removeLayer(marker);
  marker = L.marker([lat, lon]).addTo(map)
    .bindPopup(data[0].display_name)
    .openPopup();
}

document.getElementById("go").addEventListener("click", () =>
  searchLocation(document.getElementById("search").value.trim())
);

document.getElementById("search").addEventListener("keydown", e => {
  if (e.key === "Enter") searchLocation(e.target.value.trim());
});

// Automatic page-side refresh every 15 minutes.
// It does NOT claim that a satellite has produced a new image every 15 minutes.
refreshData();
setInterval(refreshData, 15 * 60 * 1000);
