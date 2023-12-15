import TextHelper from "./TextHelper";

// MarkerHelper object providing functions to handle markers on a map
const MarkerHelper = {
  // Default size for markers
  markerSize: 30,

  // Function to get the icon URL for a marker based on its index
  getIcon: (index: number) =>
    "http://maps.google.com/mapfiles/kml/paddle/" +
    TextHelper.getLetter(index) +
    ".png",

  // Function to get the size of a marker
  getSize: () =>
    new window.google.maps.Size(
      MarkerHelper.markerSize,
      MarkerHelper.markerSize
    ),

  // Function to get the origin point of a marker
  getOrigin: () => new window.google.maps.Point(0, 0),

  // Function to get the anchor point of a marker
  getAnchor: () =>
    new window.google.maps.Point(
      MarkerHelper.markerSize / 2,
      MarkerHelper.markerSize / 2
    ),
};

// Export the MarkerHelper object as the default export
export default MarkerHelper;
