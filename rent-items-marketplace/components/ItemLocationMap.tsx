"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ Set up custom marker icons
const customIcon = new L.Icon({
  iconUrl: "/images/marker-icon.png",
  iconRetinaUrl: "/images/marker-icon-2x.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface ItemLocation {
  id: number;
  name: string;
  city: string;
  coordinates: [number, number];
}

interface ItemLocationMapProps {
  items: ItemLocation[];
}

export default function ItemLocationMap({ items }: ItemLocationMapProps) {
  const [userCoordinates, setUserCoordinates] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // Default: India center
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Get user's real location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setUserCoordinates([userLat, userLng]);
          setMapCenter([userLat, userLng]); // ✅ Center map on user's location
        },
        (err) => {
          console.error("Location error:", err);
          setError("Unable to fetch your location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Find Items Near You</h2>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <MapContainer center={mapCenter} zoom={5} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* ✅ Display items on the map */}
        {items.map((item) => (
          <Marker key={item.id} position={item.coordinates} icon={customIcon}>
            <Popup>{`${item.name} - ${item.city}`}</Popup>
          </Marker>
        ))}

        {/* ✅ Display user's real location */}
        {userCoordinates && (
          <Marker position={userCoordinates} icon={customIcon}>
            <Popup>You are here!</Popup>
          </Marker>
        )}
      </MapContainer>
    </section>
  );
}
