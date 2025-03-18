import { Marker, OverlayView } from "@react-google-maps/api";
import React, { useState } from "react";
import MarkerListingItem from "./MarkerListingItem";

function MarkerItem({ item }) {
  const [selectedListing, setSelectedListing] = useState(null);
  const [isDeparture, setIsDeparture] = useState(true); // Track if the clicked pin is departure or arrival

  // Group listings by coordinates
  const listingsAtDeparture = item.departureListings || [item];
  const listingsAtArrival = item.arrivalListings || [item];

  const handleMarkerClick = (isDeparturePin) => {
    setSelectedListing(isDeparturePin ? listingsAtDeparture : listingsAtArrival);
    setIsDeparture(isDeparturePin);
  };

  return (
    <>
      {/* Departure Marker */}
      <Marker
        position={{
          lat: item.departureCoordinates.lat + 0.0001, // Small offset for overlapping pins
          lng: item.departureCoordinates.lng,
        }}
        onClick={() => handleMarkerClick(true)}
        icon={{
          url: "/mappinblue.svg", // Custom departure icon
          scaledSize: new window.google.maps.Size(32, 32),
        }}
      >
        {selectedListing && isDeparture && (
          <OverlayView
            position={{
              lat: item.departureCoordinates.lat + 0.0001,
              lng: item.departureCoordinates.lng,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <MarkerListingItem
              items={selectedListing}
              closeHandler={() => setSelectedListing(null)}
            />
          </OverlayView>
        )}
      </Marker>

      {/* Arrival Marker */}
      <Marker
        position={{
          lat: item.arrivalCoordinates.lat - 0.0001, // Small offset for overlapping pins
          lng: item.arrivalCoordinates.lng,
        }}
        onClick={() => handleMarkerClick(false)}
        icon={{
          url: "/mappinred.svg", // Custom arrival icon
          scaledSize: new window.google.maps.Size(32, 32),
        }}
      >
        {selectedListing && !isDeparture && (
          <OverlayView
            position={{
              lat: item.arrivalCoordinates.lat - 0.0001,
              lng: item.arrivalCoordinates.lng,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <MarkerListingItem
              items={selectedListing}
              closeHandler={() => setSelectedListing(null)}
            />
          </OverlayView>
        )}
      </Marker>
    </>
  );
}

export default MarkerItem;