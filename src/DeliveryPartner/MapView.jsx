import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue using ES imports
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const MapView = ({ partnerLocation, dropLocation }) => {
  if (!partnerLocation || !dropLocation) return null;

  return (
    <MapContainer
      center={[partnerLocation.latitude, partnerLocation.longitude]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      key={`${partnerLocation.latitude}-${partnerLocation.longitude}`}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[partnerLocation.latitude, partnerLocation.longitude]} />
      <Marker position={[dropLocation.latitude, dropLocation.longitude]} />
    </MapContainer>
  );
};

export default MapView;
