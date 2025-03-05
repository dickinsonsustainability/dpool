'use client';

import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection";

function ListingMapView({ type }) {
  const [listing, setListing] = useState([]);
  const [departureAddress, setDepartureAddress] = useState(null);
  const [arrivalAddress, setArrivalAddress] = useState(null);
  const [departureCoordinates, setDepartureCoordinates] = useState(null);
  const [arrivalCoordinates, setArrivalCoordinates] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [passengerCount, setPassengerCount] = useState(0);
  const [rideFrequency, setRideFrequency] = useState("");

  useEffect(() => {
    getLatestListing();
  }, []);

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("active", true)
      .eq("type", type)
      .order("id", { ascending: false });

    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Server Side Error");
    }
  };

  const handleSearchClick = async () => {
    setSearchPerformed(true);

    const departureSearchTerm =
      departureAddress?.value?.structured_formatting?.main_text || "";
    const arrivalSearchTerm =
      arrivalAddress?.value?.structured_formatting?.main_text || "";

    let query = supabase
      .from("listing")
      .select("*")
      .eq("active", true)
      .gte("passenger", Number(passengerCount))
      .eq("type", type);

    if (departureSearchTerm) {
      query = query.ilike("departureAddress", `%${departureSearchTerm}%`);
    }
    if (arrivalSearchTerm) {
      query = query.ilike("arrivalAddress", `%${arrivalSearchTerm}%`);
    }
    if (searchDate) {
      query = query.eq("date", searchDate);
    }
    if (rideFrequency && rideFrequency !== "Any") {
      query = query.eq("frequency", rideFrequency);
    }

    const { data, error } = await query.order("id", { ascending: false });

    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Search Failed");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <Listing
          listing={listing}
          handleSearchClick={handleSearchClick}
          setDepartureAddress={setDepartureAddress}
          setArrivalAddress={setArrivalAddress}
          setDepartureCoordinates={setDepartureCoordinates}
          setArrivalCoordinates={setArrivalCoordinates}
          searchPerformed={searchPerformed}
          searchDate={searchDate}
          setSearchDate={setSearchDate}
          setPassengerCount={setPassengerCount}
          setRideFrequency={setRideFrequency}
        />
      </div>
      <div className=" right-10 flex items-center md:w-[400px] lg:w-[400px] xl:w-[600px]">
        <div className="h-[90vh] w-full">
          <GoogleMapSection
            listing={listing}
            departureCoordinates={departureCoordinates}
            arrivalCoordinates={arrivalCoordinates}
          />
        </div>
      </div>
    </div>
  );
}

export default ListingMapView;