import { mappedTreeDataLeaflet } from "@constants/treeData";
import { useMapConfig } from "@hooks/index";
import "@styles/components/maps/LeafletMap.css";
import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const LeafletMap = () => {
  const { defaultCenter, isLoading, defaultZoom } = useMapConfig();
  const markers = mappedTreeDataLeaflet;

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/740/740938.png",
    iconSize: [38, 38],
  });

  const createCustomCluster = (cluster: any) => {
    return divIcon({
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    });
  };

  return isLoading ? (
    <div></div>
  ) : (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomCluster}
      >
        {markers.map((marker) => (
          <Marker
            position={marker.geocode}
            icon={customIcon}
            key={JSON.stringify(marker.geocode)}
          >
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default LeafletMap;
