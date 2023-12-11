import IAddress from "../types/IAddress";
import MapLibraries from "../types/MapLibraries";

const MapHelperHamburg = {
  //Properties
  mapContainerStyle: {
    width: "100%",
    height: "400px",
  },
  options: {
    disableDefaultUI: true,
    zoomControl: true,
  },
 
  center: { lat: 53.54952879595238, lng: 9.988688024051248 },
  initialMapZoomLevel: 11,
  onChooseZoomLevel: 16,
  libraries: ["places","localContext", "drawing","geometry","visualization"] as MapLibraries,
  alertShowSeconds: 5,
  //Functions
  getCenter: (address: IAddress) => {
    return { lat: address.lat, lng: address.lng };
  },
  mapPanTo: (map: google.maps.Map, lat: number, lng: number) => {
    if (map) {
      //Set center
      map.panTo({ lat: lat, lng: lng });
      //Set zoom
      map.setZoom(MapHelperHamburg.onChooseZoomLevel);
    }
  },
  mapPanToCenter: (
    map: google.maps.Map,
    center: { lat: number; lng: number }
  ) => {
    MapHelperHamburg.mapPanTo(map, center.lat, center.lng);
  },
  mapPanToAddress: (map: google.maps.Map, address: IAddress) => {
    MapHelperHamburg.mapPanTo(map, address.lat, address.lng);
  },
};

export default MapHelperHamburg;
