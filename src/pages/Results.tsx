import { Card } from "react-bootstrap";
import AddressTable from "../components/address/AddressTable";
import { useAppSelector } from "../store/hooks";
import classes from "./Results.module.scss";
import Map from "../components/Map";
import React, { useEffect, useState } from 'react';
import axios from "axios";

const Results: React.FC = () => {
  // Retrieve address state from the Redux store
  const addressState = useAppSelector((state) => state.address);
  const hasMinimumAddresses = addressState.count >= 2;
  const points = addressState.addresses;

  // State to store the addresses in the shortest path order
  const [addresses, setAddresses] = useState<string[]>([]);
  
  // Data structure for markers on the map
  interface MarkerData {
    position: { lat: number; lng: number };
  }

  // Map points to marker data
  const markers: MarkerData[] = points.map((point) => ({
    position: {
      lat: point.lat,
      lng: point.lng,
    },
  }));

  const apiKey = 'AIzaSyBYrduZrOh_goAX7wqhEA9SPEOXCBT-IdI'; // Replace with your API key

  // Extract coordinates for Distance Matrix API
  const slots = points.map((point) => ({
    lat: point.lat,
    lng: point.lng,
  }));

  // useEffect to calculate the shortest distance on component mount or when addresses change
  useEffect(() => {
    const calculateShortestDistance = async () => {
      try {
        // Fetch distance data from Distance Matrix API
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${slots
            .map((point) => `${point.lat},${point.lng}`)
            .join('|')}&destinations=${slots
            .map((point) => `${point.lat},${point.lng}`)
            .join('|')}&key=${apiKey}`
        );
    
        
    
        const rows: any[] = response.data.rows; // Explicitly type rows as an array of any
    
        // Extract distances from the response
        const distances: number[][] = rows.map((row: any) =>
          row.elements.map((element: { distance: { value: number } }) => element.distance.value)
        );    

        // Find the shortest permutation of addresses
        const permutation = findShortestPermutation(distances);

        // Extract the details of the addresses in the shortest path order
        const shortestPathDetails = permutation.map((index) => points[index]);

        // Fetch the names of the addresses using the Geocoding API
        const geocodePromises = shortestPathDetails.map((point) =>
          axios
            .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${point.lat},${point.lng}&key=${apiKey}`)
            .then((response) => {
              if (response.data.error_message) {
                console.log(response.data.error_message);
                return ''; // Return an empty string if there's an error
              } else {
                if (response.data.results.length > 0) {
                  return response.data.results[0]?.formatted_address || ''; // Use the formatted address
                } else {
                  console.log('No results found');
                  return ''; // Return an empty string if there are no results
                }
              }
            })
            .catch((error) => {
              console.error('Geocoding failed:', error);
              return ''; // Return an empty string if there's an error
            })
        );

        // Resolve all geocoding promises
        const shortestPathAddresses = await Promise.all(geocodePromises);

        // Set the addresses in the state
        setAddresses(shortestPathAddresses);
        
      } catch (error) {
        console.error('Error calculating shortest distance:', error);
      }
    };

    // Call the function to calculate shortest distance
    calculateShortestDistance();
  }, [slots, apiKey]);

  // Function to find the shortest permutation using a brute-force approach
  const findShortestPermutation = (distances: number[][]) => {
    const n = distances.length;
    const indices = Array.from({ length: n }, (_, i) => i);

    let shortestDistance = Number.MAX_SAFE_INTEGER;
    let shortestPermutation: number[] = [];

    do {
      let totalDistance = 0;

      for (let i = 0; i < n - 1; i++) {
        totalDistance += distances[indices[i]][indices[i + 1]];
      }

      if (totalDistance < shortestDistance) {
        shortestDistance = totalDistance;
        shortestPermutation = [...indices];
      }
    } while (nextPermutation(indices));

    return shortestPermutation;
  };

  // Function to generate the next permutation
  const nextPermutation = (array: number[]) => {
    let i = array.length - 1;
    while (i > 0 && array[i - 1] >= array[i]) {
      i--;
    }

    if (i <= 0) {
      return false;
    }

    let j = array.length - 1;
    while (array[j] <= array[i - 1]) {
      j--;
    }

    [array[i - 1], array[j]] = [array[j], array[i - 1]];

    j = array.length - 1;
    while (i < j) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
      j--;
    }

    return true;
  };

  return (
    <section>
      <h2 className="text-center">Locations</h2>
      <Card>
        <Card.Header>
          <b>Your Addresses</b>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-12">
              <AddressTable resultPage={true} />
            </div>
          </div>
        </Card.Body>
      </Card>

      <h2 className="text-center">Map View</h2>
      {hasMinimumAddresses && (
        <Card>
          <Card.Header>
            <b>Results</b>
            <span className={classes.legend}>
              (This service uses DistanceMatrixService from Google Maps API)
            </span>
          </Card.Header>
          <Card.Body>
            <>
              <div>
                <Map markers={markers} apiKey={apiKey} />
              </div>
            </>
          </Card.Body>
        </Card>
      )}
      
    </section>
  );
};

export default Results;

