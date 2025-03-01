"use client";

import { MapPin } from "lucide-react";
import React from "react";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

function GoogleAddressSearch({ label, selectedAddress, setCoordinates }) {
  return (
    <div className="flex items-center w-full mt-2">
      <MapPin className="h-10 w-10 p-2 rounded-l-lg text-primary bg-green-200" />
      
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: `${label}`,
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            if (place) {
              console.log(place);
              selectedAddress(place); // Set the selected address in the parent component
              geocodeByAddress(place.label)
                .then((result) => getLatLng(result[0]))
                .then(({ lat, lng }) => {
                  setCoordinates({ lat, lng }); // Set the coordinates in the parent component
                })
                .catch((error) => {
                  console.error("Error getting coordinates:", error);
                });
            } else {
              selectedAddress(''); // If the input is cleared, reset address
              setCoordinates(null); // Reset coordinates if input is cleared
            }
          },
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
