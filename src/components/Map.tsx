import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';
import { Tooltip } from 'react-tooltip';
import { Card, Table } from "react-bootstrap";

interface MarkerData {
  position: google.maps.LatLngLiteral;
}

interface MapProps {
  markers: MarkerData[];
  apiKey: string;
}

const Map: React.FC<MapProps> = ({ markers, apiKey }) => {
  const center = { lat: 52.520008, lng: 13.404954 };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [locationData, setLocationData] = useState<{ name: string; distance: number }[]>([]);

  useEffect(() => {
    const calculateShortestPath = () => {
      const directionsService = new google.maps.DirectionsService();
      const waypoints = markers.map((marker) => ({
        location: marker.position,
        stopover: true,
      }));

      const origin = waypoints[0].location;
      const destination = waypoints[waypoints.length - 1].location;

      const optimizedWaypoints = waypoints.slice(1, waypoints.length - 1) as google.maps.DirectionsWaypoint[];

      const request: google.maps.DirectionsRequest = {
        origin,
        destination,
        waypoints: optimizedWaypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        }
      });
    };

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

    const geocodeMarkers = () => {
      const geocoder = new google.maps.Geocoder();
      const promises = markers.map((marker) => {
        return new Promise<{ name: string; distance: number }>((resolve) => {
          geocoder.geocode({ location: marker.position }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
              const name = results[0].formatted_address;
              const distance = calculateDistance(marker.position, results[0].geometry.location.toJSON());
              resolve({ name, distance });
            } else {
              resolve({ name: 'Unknown location', distance: 0 });
            }
          });
        });
      });

      Promise.all(promises).then((data) => {
        setLocationData(data);
      });
    };

    if (isLoaded) {
      calculateShortestPath();
      geocodeMarkers();
    }
  }, [isLoaded, markers]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return null; // or a loading indicator
  }

  // Sort addresses by distance
  const sortedLocations = locationData.slice().sort((a, b) => a.distance - b.distance);

  return (
    <>
      <GoogleMap mapContainerStyle={{ height: '400px', width: '100%' }} center={center} zoom={11}>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} label={locationData[index]?.name} />
        ))}
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

export default Map;
