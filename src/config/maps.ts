export const mapOptions = {
    apiKey: process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY || null,
    mapId: process.env.REACT_APP_MAP_ID,
    defaultCenter: {
        lat: 43.661036,
        lng: -79.391277,
    },
    defaultZoom: 17,
    disableDefaultUI: true,
    defaultHeading: 25,
    defaultTilt: 25,
};
