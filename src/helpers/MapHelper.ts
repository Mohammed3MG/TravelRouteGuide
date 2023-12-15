import IAddress from "../types/IAddress";
import MapLibraries from "../types/MapLibraries";

// MapHelper object providing properties and functions related to maps
const MapHelper = {
  // Properties for map styling and configuration
  mapContainerStyle: {
    width: "100%",
    height: "400px",
  },
  options: {
    disableDefaultUI: true,
    zoomControl: true,
  },
  center: { lat: 52.51823473005389, lng: 13.376966541898518 }, // Default map center
  initialMapZoomLevel: 11, // Initial zoom level when the map loads
  onChooseZoomLevel: 16, // Zoom level when a location is chosen
  libraries: ["places", "localContext", "drawing", "geometry", "visualization"] as MapLibraries, // Google Maps libraries to load
  alertShowSeconds: 5, // Duration for alert messages to be displayed

  // Function to get the center of a map based on an address
  getCenter: (address: IAddress) => {
    return { lat: address.lat, lng: address.lng };
  },

  // Function to pan the map to a specific location
  mapPanTo: (map: google.maps.Map, lat: number, lng: number) => {
    if (map) {
      // Set the center of the map
      map.panTo({ lat: lat, lng: lng });
      // Set the zoom level of the map
      map.setZoom(MapHelper.onChooseZoomLevel);
    }
  },

  // Function to pan the map to a specific center
  mapPanToCenter: (
    map: google.maps.Map,
    center: { lat: number; lng: number }
  ) => {
    MapHelper.mapPanTo(map, center.lat, center.lng);
  },

  // Function to pan the map to a specific address
  mapPanToAddress: (map: google.maps.Map, address: IAddress) => {
    MapHelper.mapPanTo(map, address.lat, address.lng);
  },
};

// Export the MapHelper object as the default export
export default MapHelper;
