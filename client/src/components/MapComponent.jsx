// MapComponent.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

// Component to handle map view updates
const ChangeMapView = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

const MapComponent = ({ setLocation }) => {
  const [position, setPosition] = useState([12.9716, 77.5946]); // Default location (Bangalore)
  const [isLocationFound, setIsLocationFound] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setPosition([latitude, longitude]);
                setIsLocationFound(true);

                // Reverse Geocoding API to get location name
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then(res => res.json())
                    .then(data => {
                        const city = data.address.city || data.address.state || "Unknown";
                        setLocation(city); // Updates Header & InfoHeader
                    })
                    .catch(error => console.error("Error fetching location name:", error));
            },
            (error) => {
                console.error("Error getting location:", error);
                setIsLocationFound(false);
                // Keep Bangalore as fallback if geolocation fails
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
        setIsLocationFound(false);
    }
}, []);


  const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer center={position} zoom={13} style={{ height: '750px', width: '100%' }}>
      <TileLayer
         //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
       //url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
       //url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
       url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
       
      />
      {isLocationFound && (
        <>
          <ChangeMapView center={position} />
          <Marker position={position} icon={customIcon}>
            <Popup>Your current location!</Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
};

export default MapComponent;
