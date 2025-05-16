import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const ORS_API_KEY = '5b3ce3597851110001cf62481d28f3f75a094b1ead6d148f48a76b68'; // replace this with your real ORS key

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icon for pickup
const greenPin = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapRouting = ({ pickup, destination }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [pickupMarker, setPickupMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);

  // Responsive map height
  const mapHeight = 'h-96 sm:h-[28rem] md:h-[32rem] lg:h-[36rem] xl:h-[40rem] min-h-[300px]';

  // Initialize map centered on Washington DC
  useEffect(() => {
    if (!mapRef.current) return;
    if (mapRef.current._leaflet_id) mapRef.current._leaflet_id = null;
    const m = L.map(mapRef.current).setView([38.9072, -77.0369], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(m);
    setMap(m);
    return () => m.remove();
  }, []);

  // Watch for pickup/destination changes and fetch ORS route
  useEffect(() => {
    if (!map || !pickup || !destination) return;

    // Clean up old markers and lines
    if (pickupMarker) { map.removeLayer(pickupMarker); setPickupMarker(null); }
    if (destinationMarker) { map.removeLayer(destinationMarker); setDestinationMarker(null); }
    if (routingControl) { map.removeLayer(routingControl); setRoutingControl(null); }

    const wp1 = [pickup.lon, pickup.lat]; // ORS expects [lon, lat]
    const wp2 = [destination.lon, destination.lat];

    const fetchRoute = async () => {
      try {
        const res = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
          method: 'POST',
          headers: {
            'Authorization': ORS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coordinates: [wp1, wp2],
          }),
        });

        const data = await res.json();

        const routeCoords = data.features[0].geometry.coordinates.map(
          ([lng, lat]) => [lat, lng]  // Convert to Leaflet format [lat, lng]
        );

        // Draw route line
        const route = L.polyline(routeCoords, {
          color: '#3b82f6',
          weight: 4,
          opacity: 0.9,
        }).addTo(map);

        // Get distance from ORS response and show as popup
        const meters = data.features[0].properties.summary.distance;
        const distance = (meters / 1000).toFixed(2);
        route.bindPopup(`Distance: ${distance} km`).openPopup();

        setRoutingControl(route); // Save so we can remove it later
        map.fitBounds(route.getBounds());

        // Add markers
        const pm = L.marker([pickup.lat, pickup.lon], { icon: greenPin }).addTo(map).bindPopup('Pickup');
        const dm = L.marker([destination.lat, destination.lon]).addTo(map).bindPopup('Destination');
        setPickupMarker(pm);
        setDestinationMarker(dm);
      } catch (err) {
        console.error('Failed to fetch ORS route:', err);
      }
    };

    fetchRoute();
  }, [map, pickup, destination]);

  return (
    <div className="relative w-full z-10 h-[500px]">
      <div ref={mapRef} className="h-full w-full rounded-md shadow border" />
    </div>
  );
};

export default MapRouting;