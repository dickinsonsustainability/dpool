import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MarkerItem from "./MarkerItem";

// Define libraries as a static array outside the component
const LIBRARIES = ["places"]; // Add any other libraries you need

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: 10,
};

const defaultCenter = {
  lat: 40.2026,
  lng: -77.1911,
};

function GoogleMapSection({ arrivalCoordinates, departureCoordinates, listing }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    libraries: LIBRARIES, // Use the static array
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(defaultCenter);

  // Group listings by coordinates
  const groupedListings = listing.reduce((acc, item) => {
    const departureKey = `${item.departureCoordinates.lat},${item.departureCoordinates.lng}`;
    const arrivalKey = `${item.arrivalCoordinates.lat},${item.arrivalCoordinates.lng}`;

    // Initialize departureListings if not already initialized
    if (!acc[departureKey]) {
      acc[departureKey] = { ...item, departureListings: [] };
    }
    if (!acc[departureKey].departureListings) {
      acc[departureKey].departureListings = [];
    }
    acc[departureKey].departureListings.push(item);

    // Initialize arrivalListings if not already initialized
    if (!acc[arrivalKey]) {
      acc[arrivalKey] = { ...item, arrivalListings: [] };
    }
    if (!acc[arrivalKey].arrivalListings) {
      acc[arrivalKey].arrivalListings = [];
    }
    acc[arrivalKey].arrivalListings.push(item);

    return acc;
  }, {});

  // Update map center when departure or arrival coordinates change
  useEffect(() => {
    if (departureCoordinates) {
      setCenter(departureCoordinates);
    } else if (arrivalCoordinates) {
      setCenter(arrivalCoordinates);
    }
  }, [departureCoordinates, arrivalCoordinates]);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Markers for listings */}
        {Object.values(groupedListings).map((item, index) => (
          <MarkerItem key={index} item={item} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default GoogleMapSection;