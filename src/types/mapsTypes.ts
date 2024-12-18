export type MapType = google.maps.Map;

export type TravelModeType = google.maps.TravelMode;

export type PointType = google.maps.LatLngLiteral;

export type DirectionsServiceType = google.maps.DirectionsService;

export type DirectionsRendererType = google.maps.DirectionsRenderer;

export type DirectionsRouteType = google.maps.DirectionsRoute;

export type DirectionsRequestServiceType = {
    directionsService: DirectionsServiceType;
    origin: PointType;
    destination: PointType;
    travelMode: TravelModeType;
}

export type GeoCodeType = google.maps.GeocoderResult