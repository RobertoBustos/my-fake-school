import type { PointType } from "@customTypes/index";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

export type MarkerListPropsType = {
  markers: PointType | PointType[];
  pinElement?: any;
};

const MarkerList = ({ markers, pinElement }: MarkerListPropsType) => {
  const mapReference = useMap();
  const [markerList, setMarkerList] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  useEffect(() => {
    if (!mapReference) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map: mapReference });
    }
  }, [mapReference]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markerList));
  }, [markerList]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markerList[key]) return;
    if (!marker && !markerList[key]) return;
    setMarkerList((prev) => {
      if (marker) return { ...prev, [key]: marker };

      const newMarkers = { ...prev };
      delete newMarkers[key];
      return newMarkers;
    });
  };

  const renderPoint = (point: PointType) => {
    const coordinates = {
      lat: point.lat,
      lng: point.lng,
    };
    const markerKey = `${point.lat}${point.lng}`;
    return (
      <AdvancedMarker
        position={coordinates}
        key={markerKey}
        ref={(marker) => setMarkerRef(marker, markerKey)}
      >
        {pinElement ? (
          pinElement
        ) : (
          <Pin
            background={"red"}
            borderColor={"transparent"}
            glyphColor={"white"}
            scale={1}
          />
        )}
      </AdvancedMarker>
    );
  };

  const pointsList = () => {
    if (Array.isArray(markers)) {
      return markers.map((marker) => {
        return renderPoint(marker);
      });
    }
    return renderPoint(markers);
  };

  return <>{pointsList()}</>;
};

export default MarkerList;
