import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./Map.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Routing from "../Routing";

const Map = () => {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  return (
    <MapContainer
      className="leaflet-container"
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing pointA={[51.505, -0.09]} pointB={[51.54, -0.095]} />
      <Marker position={[51.505, -0.09]} icon={DefaultIcon}>
        <Popup>Тоска погрузки</Popup>
      </Marker>
      <Marker position={[51.54, -0.095]} icon={DefaultIcon}>
        <Popup>Точка выгрузки</Popup>
      </Marker>
    </MapContainer>
  );
};
export default Map;
