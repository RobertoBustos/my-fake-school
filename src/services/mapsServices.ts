import type { DirectionsRequestServiceType } from "@customTypes/index";
import { getGeocode, getLatLng } from "use-places-autocomplete";

export async function getRoutesByLocation(payload: DirectionsRequestServiceType) {
    try {
        const response = await payload.directionsService.route(
            {
                origin: payload.origin,
                destination: payload.destination,
                travelMode: payload.travelMode,
                provideRouteAlternatives: true
            },
        );
        return response
    } catch (error) {
        console.error(error)
    }
}

export async function getCoordenatesByAddress(address: string) {
    try {
        const results = await getGeocode({ address });
        const { lat, lng } = getLatLng(results[0]);
        return { lat, lng };
    } catch (error) {
        console.error(error)
    }
}