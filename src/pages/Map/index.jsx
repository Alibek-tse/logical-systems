import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./Map.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";
import Routing from "../../components/Routing";

const Map = () => {
  const { tableData } = useSelector((state) => state.table);
  const [vLayer, setVLayer] = React.useState([]);

  React.useEffect(() => {
    const flag = tableData?.filter(
      (item) => item.departure.length > 0 && item.unloading.length > 0
    );
    setVLayer(flag);
  }, [tableData]);

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  return (
    <>
      <MapContainer
        className="leaflet-container"
        center={[55.747, 37.624]}
        zoom={12}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vLayer.length > 0 &&
          vLayer?.map((item, ind) => (
            <div key={ind}>
              <Routing
                pointA={item.departure[0].pos}
                pointB={item.unloading[0].pos}
              />
              <Marker position={item.departure[0].pos} icon={DefaultIcon}>
                <Popup>Тоска погрузки</Popup>
              </Marker>
              <Marker position={item.unloading[0].pos} icon={DefaultIcon}>
                <Popup>Точка выгрузки</Popup>
              </Marker>
            </div>
          ))}
      </MapContainer>
    </>
  );
};
export default Map;
