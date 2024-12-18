import type { PointType } from "@customTypes/index";
import {
  useGooglePlacesAutocomplete,
  useMemoizedTranslation,
} from "@hooks/index";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
  ComboboxPopover,
} from "@reach/combobox";
import "@styles/components/maps/GoogleMap.css";
import { IconType } from "react-icons";
import { FaLocationDot } from "react-icons/fa6";

export type PlacesAutoCompletePropsType = {
  onSelectOption?: (point: PointType | undefined) => void;
  className?: string;
  EndIcon?: IconType | null;
  placeHolder?: string;
};

const PlacesAutocomplete = ({
  onSelectOption,
  className,
  EndIcon,
  placeHolder,
}: PlacesAutoCompletePropsType) => {
  const {
    map,
    ready,
    value,
    setValue,
    status,
    data,
    clearSuggestions,
    placesService,
  } = useGooglePlacesAutocomplete();
  const { t } = useMemoizedTranslation();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    const response = await placesService(address);
    if (response) {
      const { lat, lng } = response;
      map?.setCenter({ lat, lng });
      map?.setZoom(12);
      if (onSelectOption) onSelectOption({ lat, lng });
    }
  };

  const handleClearSearch = () => {
    if (value) {
      setValue("");
    }
    if (onSelectOption) onSelectOption(undefined);
  };

  return (
    <div className={className}>
      <Combobox onSelect={handleSelect}>
        <div>
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            placeholder={placeHolder ? t(placeHolder) : ""}
            className="places-input"
          />
          {EndIcon && <EndIcon className="icon" onClick={handleClearSearch} />}
        </div>
        <ComboboxPopover>
          <ComboboxList className="places-options">
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  value={description}
                  as={"div"}
                  key={place_id}
                  className="places-option"
                >
                  <FaLocationDot color={"red"} />
                  <ComboboxOptionText />
                </ComboboxOption>
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default PlacesAutocomplete;
