import { getCoordenatesByAddress } from "@services/index";
import { useMap } from "@vis.gl/react-google-maps";
import usePlacesAutocomplete from "use-places-autocomplete";

export const useGooglePlacesAutocomplete = () => {
    const map = useMap();
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const placesService = async (address: string) => {
        try {
            const coordenates = await getCoordenatesByAddress(address)
            return coordenates
        } catch (error) {
            console.error(error)
        }

    }

    return { map, ready, value, setValue, status, data, clearSuggestions, placesService }
}