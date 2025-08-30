import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const ORS_API_KEY = '5b3ce3597851110001cf62481d28f3f75a094b1ead6d148f48a76b68';

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons
const greenPin = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redPin = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapRouting = ({ pickup, destination, onLocationSelect }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [pickupMarker, setPickupMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [selectionType, setSelectionType] = useState(null); // 'pickup' or 'destination'

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

  // Handle map click for location selection
  useEffect(() => {
    if (!map) return;

    const handleMapClick = async (e) => {
      if (!isSelectingLocation) return;

      const { lat, lng } = e.latlng;
      
      try {
        // Reverse geocode to get address
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();
        
        if (data.display_name) {
          const locationData = {
            name: data.display_name,
            lat: lat,
            lon: lng,
          };
          
          if (onLocationSelect) {
            onLocationSelect(selectionType, locationData);
          }
        }
      } catch (error) {
        console.error('Reverse geocoding error:', error);
      }
      
      setIsSelectingLocation(false);
      setSelectionType(null);
    };

    map.on('click', handleMapClick);
    
    return () => {
      map.off('click', handleMapClick);
    };
  }, [map, isSelectingLocation, selectionType, onLocationSelect]);

  // Watch for pickup/destination changes and fetch ORS route
  useEffect(() => {
    if (!map || !pickup || !destination) {
      // Clean up markers if locations are cleared
      if (pickupMarker) { map.removeLayer(pickupMarker); setPickupMarker(null); }
      if (destinationMarker) { map.removeLayer(destinationMarker); setDestinationMarker(null); }
      if (routingControl) { map.removeLayer(routingControl); setRoutingControl(null); }
      setDistance(null);
      setDuration(null);
      return;
    }

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

        if (data.features && data.features.length > 0) {
          const routeCoords = data.features[0].geometry.coordinates.map(
            ([lng, lat]) => [lat, lng]  // Convert to Leaflet format [lat, lng]
          );

          // Draw route line
          const route = L.polyline(routeCoords, {
            color: '#3b82f6',
            weight: 4,
            opacity: 0.9,
          }).addTo(map);

          // Get distance and duration from ORS response
          const meters = data.features[0].properties.summary.distance;
          const seconds = data.features[0].properties.summary.duration;
          const distanceKm = (meters / 1000).toFixed(1);
          const durationMin = Math.round(seconds / 60);
          
          setDistance(distanceKm);
          setDuration(durationMin);

          // Create popup content
          const popupContent = `
            <div class="text-center">
              <div class="font-bold text-blue-600">Route Information</div>
              <div class="text-sm">
                <div>Distance: ${distanceKm} km</div>
                <div>Duration: ${durationMin} min</div>
              </div>
            </div>
          `;
          
          route.bindPopup(popupContent).openPopup();

          setRoutingControl(route);
          map.fitBounds(route.getBounds(), { padding: [20, 20] });

          // Add markers
          const pm = L.marker([pickup.lat, pickup.lon], { icon: greenPin })
            .addTo(map)
            .bindPopup(`
              <div class="text-center">
                <div class="font-bold text-green-600">Pickup Location</div>
                <div class="text-sm">${pickup.name}</div>
              </div>
            `);
          
          const dm = L.marker([destination.lat, destination.lon], { icon: redPin })
            .addTo(map)
            .bindPopup(`
              <div class="text-center">
                <div class="font-bold text-red-600">Destination</div>
                <div class="text-sm">${destination.name}</div>
              </div>
            `);
          
          setPickupMarker(pm);
          setDestinationMarker(dm);
        }
      } catch (err) {
        console.error('Failed to fetch ORS route:', err);
      }
    };

    fetchRoute();
  }, [map, pickup, destination]);

  const startLocationSelection = (type) => {
    setIsSelectingLocation(true);
    setSelectionType(type);
  };

  return (
    <div className="relative w-full h-full">
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-20 space-y-2">
        <button
          onClick={() => startLocationSelection('pickup')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSelectingLocation && selectionType === 'pickup'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-800 hover:bg-gray-100'
          } shadow-lg`}
        >
          {isSelectingLocation && selectionType === 'pickup' ? 'Click on map for pickup' : 'Set Pickup'}
        </button>
        <button
          onClick={() => startLocationSelection('destination')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSelectingLocation && selectionType === 'destination'
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-800 hover:bg-gray-100'
          } shadow-lg`}
        >
          {isSelectingLocation && selectionType === 'destination' ? 'Click on map for destination' : 'Set Destination'}
        </button>
      </div>

      {/* Route Information */}
      {distance && duration && (
        <div className="absolute top-4 right-4 z-20 bg-white rounded-lg p-3 shadow-lg">
          <div className="text-sm font-medium text-gray-800">
            <div>Distance: {distance} km</div>
            <div>Duration: {duration} min</div>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div ref={mapRef} className="h-full w-full rounded-md shadow border" />
      
      {/* Instructions */}
      {isSelectingLocation && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Click on the map to set {selectionType === 'pickup' ? 'pickup' : 'destination'} location
        </div>
      )}
    </div>
  );
};

export default MapRouting;