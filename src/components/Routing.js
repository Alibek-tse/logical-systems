import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function Routing({ pointA, pointB }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(pointA), L.latLng(pointB)],
      routeWhileDragging: true,
      show: false,
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4,
          },
        ],
      },
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, pointA, pointB]);

  return null;
}
