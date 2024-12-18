
import type { DirectionsRendererType, DirectionsRouteType, DirectionsServiceType, PointType, TravelModeType } from "@customTypes/index";
import { getRoutesByLocation } from "@services/index";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";

export const useDirections = (origin: PointType, destination: PointType) => {
    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionsService] =
        useState<DirectionsServiceType>();
    const [directionsRenderer, setDirectionsRenderer] =
        useState<DirectionsRendererType>();
    const [routes, setRoutes] = useState<DirectionsRouteType[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    const getRoutes = useCallback(async (directionsRenderer: DirectionsRendererType, directionsService: DirectionsServiceType, origin: PointType, destination: PointType, travelMode: TravelModeType) => {
        try {
            const response = await getRoutesByLocation({ directionsService, origin, destination, travelMode })
            if (response) {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);
            }
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(
            new routesLibrary.DirectionsRenderer({ map })
        );
    }, [map, routesLibrary])

    useEffect(() => {
        if (!directionsRenderer || !directionsService || !origin || !destination)
            return;
        getRoutes(directionsRenderer, directionsService, origin, destination, google.maps.TravelMode.WALKING)

    }, [directionsService, directionsRenderer, routesLibrary, origin, destination, getRoutes]);

    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [directionsRenderer, routeIndex]);

    return { leg, selected, routes, routeIndex, setRouteIndex }
}