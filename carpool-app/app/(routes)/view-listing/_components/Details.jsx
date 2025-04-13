// import GoogleMapSection from "@/app/_components/GoogleMapSection";
import { Button } from "@/components/ui/button";
import {
  Car,
  CircleDollarSign,
  MapPin,
  Share,
  UserRound,
  Calendar,
  Clock,
} from "lucide-react";
import React from "react";
import AgentDetail from "./AgentDetail";


function Details({ listingDetail }) {
  if (!listingDetail) {
    return <p>No listing details available.</p>;
  }

  const handleShare = () => {
    const currentUrl = window.location.href; // Get current page URL
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        console.log("URL copied to clipboard!");
        alert("Listing link copied to clipboard!"); // Optional: show user confirmation
      })
      .catch((error) => console.error("Error copying URL:", error));
  };

  // Extract coordinates for departure and arrival
  const departureCoordinates = listingDetail.departureCoordinates;
  const arrivalCoordinates = listingDetail.arrivalCoordinates;

  return (
    <div className="my-6 flex flex-col gap-6">
      {/* Top Section: Title, Addresses, and Share Button */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-bold text-3xl">{listingDetail.title}</h2>
          {/* Increased gap between title and departure address */}
          <div className="text-gray-500 text-lg flex flex-col gap-2 mt-4">
            <div className="flex gap-2 items-center">
              <MapPin />
              <span>{listingDetail.departureAddress}</span>
            </div>
            <div className="flex gap-2 items-center">
              <MapPin />
              <span>{listingDetail.arrivalAddress}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Calendar size={18} />
              <span>{listingDetail.date}</span>
            </div>
            <div className="flex gap-2 items-center">
              <Clock size={18} />
              <span>{listingDetail.time}</span>
            </div>
          </div>
          <Button className="flex gap-2 mt-4" onClick={handleShare}>
            <Share size={18} />
            Share
          </Button>
        </div>
      </div>

      <hr className="my-4" />

      {/* Trip Details Section */}
      <div className="mt-4">
        <h2 className="font-bold text-2xl mb-4">Trip Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex gap-2 items-center bg-green-100 rounded-lg p-3 text-primary justify-center">
            <UserRound size={18} />
            <span>{listingDetail.passenger} Passengers</span>
          </div>
          <div className="flex gap-2 items-center bg-green-100 rounded-lg p-3 text-primary justify-center">
            <CircleDollarSign size={18} />
            <span>${listingDetail.price}</span>
          </div>
          <div className="flex gap-2 items-center bg-green-100 rounded-lg p-3 text-primary justify-center">
            <Car size={18} />
            <span>{listingDetail.frequency}</span>
          </div>
        </div>
      </div>

      {/* Note Section */}
      <div className="mt-6">
        <h2 className="font-bold text-2xl mb-2">Drive's Message</h2>
        <p className="text-gray-600">{listingDetail.description}</p>
      </div>

      {/* <hr className="my-4" /> */}

      {/* Map Section */}
      {/* <div>
        <h2 className="font-bold text-2xl mb-2">Find On Map</h2>
        <GoogleMapSection
          departureCoordinates={departureCoordinates}
          arrivalCoordinates={arrivalCoordinates}
        />
      </div> */}
      <div>
        <h2 className="font-bold text-2xl mb-2">Contact</h2>
        <AgentDetail listingDetail={listingDetail} />
      </div>

      {/* <hr className="my-4" />
      <di>
      <h2 className="font-bold text-2xl mb-2">Comment</h2>
      </di> */}

    </div>
  );
}

export default Details;
