import Directions from "@components/maps/provider/Directions";
import MarkerList from "@components/maps/provider/MarkerList";
import PlacesAutocomplete from "@components/maps/provider/PlacesAutocomplete";
import type { PointType } from "@customTypes/index";
import { useMapConfig } from "@hooks/index";
import "@styles/components/maps/GoogleMap.css";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

const GoogleMapProvider = () => {
  const mapOptions = useMapConfig();
  const [selected, setSelected] = useState<PointType | PointType[] | undefined>(
    undefined
  );
  const [destination, setDestination] = useState<PointType | undefined>(
    undefined
  );

  /*   useEffect(() => {
    const mappedTreeList = treeData.map((tree) => {
      const coordinates = tree.geometry.coordinates[0];
      return {
        lat: coordinates[1],
        lng: coordinates[0],
      };
    });
    setSelected(mappedTreeList);
  }, []); */

  const renderElements = () => {
    if (selected && !Array.isArray(selected) && destination) {
      return <Directions origin={selected} destination={destination} />;
    }
    if (selected && !destination) {
      return <MarkerList markers={selected} />;
    }
    return null;
  };

  return mapOptions.isLoading ? (
    <div></div>
  ) : (
    <APIProvider apiKey={mapOptions.apiKey!} libraries={["places"]}>
      <div className="map">
        <Map {...mapOptions}>
          <PlacesAutocomplete
            onSelectOption={setSelected}
            className="places-origin"
            EndIcon={selected ? AiOutlineClose : AiOutlineSearch}
            placeHolder={"maps.searchPlaceholder"}
          />
          {selected ? (
            <PlacesAutocomplete
              onSelectOption={setDestination}
              className="places-destination"
              EndIcon={AiOutlineClose}
              placeHolder={"maps.destinationPlaceholder"}
            />
          ) : null}
          {renderElements()}
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMapProvider;
