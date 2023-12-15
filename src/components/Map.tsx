import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';
import { Table } from "react-bootstrap";

// Define the shape of the marker data
interface MarkerData {
  position: google.maps.LatLngLiteral;
}

// Define the properties expected by the Map component
interface MapProps {
  markers: MarkerData[];
  apiKey: string;
}

// Map component definition
const Map: React.FC<MapProps> = ({ markers, apiKey }) => {
  // Default center for the map
  const center = { lat: 52.520008, lng: 13.404954 };

  // Load Google Maps API using the useLoadScript hook
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  // State to store directions and location data
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [locationData, setLocationData] = useState<{ name: string; distance: number }[]>([]);

  // Effect to calculate shortest path and geocode markers when the map is loaded or markers change
  useEffect(() => {
    // Function to calculate the shortest path using Google Maps DirectionsService
    const calculateShortestPath = () => {
      // Create a DirectionsService instance
      const directionsService = new google.maps.DirectionsService();

      // Create waypoints from the markers
      const waypoints = markers.map((marker) => ({
        location: marker.position,
        stopover: true,
      }));

      // Extract origin and destination from waypoints
      const origin = waypoints[0].location;
      const destination = waypoints[waypoints.length - 1].location;

      // Extract optimized waypoints (excluding origin and destination)
      const optimizedWaypoints = waypoints.slice(1, waypoints.length - 1) as google.maps.DirectionsWaypoint[];

      // Create a DirectionsRequest object
      const request: google.maps.DirectionsRequest = {
        origin,
        destination,
        waypoints: optimizedWaypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      };

      // Request the directions from the DirectionsService
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          // Set the directions state with the result
          setDirections(result);
        }
      });
    };

    // Function to calculate distance between two points on the Earth
    const calculateDistance = (point1: google.maps.LatLngLiteral, point2: google.maps.LatLngLiteral): number => {
      const rad = (x: number) => (x * Math.PI) / 180;
      const R = 6371000; // Earth radius in meters

      const lat1 = rad(point1.lat);
      const lon1 = rad(point1.lng);
      const lat2 = rad(point2.lat);
      const lon2 = rad(point2.lng);

      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    };

    // Function to geocode markers and calculate distances
    const geocodeMarkers = () => {
      // Create a Geocoder instance
      const geocoder = new google.maps.Geocoder();

      // Create promises for each marker to geocode and calculate distance
      const promises = markers.map((marker) => {
        return new Promise<{ name: string; distance: number }>((resolve) => {
          // Use the Geocoder to get location information for the marker
          geocoder.geocode({ location: marker.position }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
              // Extract name and distance and resolve the promise
              const name = results[0].formatted_address;
              const distance = calculateDistance(marker.position, results[0].geometry.location.toJSON());
              resolve({ name, distance });
            } else {
              // If geocoding fails, resolve with default values
              resolve({ name: 'Unknown location', distance: 0 });
            }
          });
        });
      });

      // Use Promise.all to wait for all promises to resolve
      Promise.all(promises).then((data) => {
        // Set the location data state with the resolved data
        setLocationData(data);
      });
    };

    // Check if the map is loaded, then calculate the shortest path and geocode markers
    if (isLoaded) {
      calculateShortestPath();
      geocodeMarkers();
    }
  }, [isLoaded, markers]);

  // Render an error message if there is an issue loading Google Maps
  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  // Render nothing while the map is still loading
  if (!isLoaded) {
    return null; // or a loading indicator
  }

  // Sort addresses by distance
  const sortedLocations = locationData.slice().sort((a, b) => a.distance - b.distance);

  // Return the JSX representing the Google Map, markers, directions, and a table of sorted addresses
  return (
    <>
      <GoogleMap mapContainerStyle={{ height: '400px', width: '100%' }} center={center} zoom={11}>
        {/* Render markers on the map */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} label={locationData[index]?.name} />
        ))}
        {/* Render directions on the map if available */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: 'red',
              },
            }}
          />
        )}
      </GoogleMap>
      {/* Display addresses in a table */}
      <div>
        <h2>Sorted Addresses by Shortest Distance</h2>
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Address</th>
              <th>Distance (meters)</th>
            </tr>
          </thead>
          <tbody>
            {/* Render rows in the table for each sorted location */}
            {sortedLocations.map((location, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{location.name}</td>
                <td>{location.distance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

// Export the Map component as the default export
export default Map;
