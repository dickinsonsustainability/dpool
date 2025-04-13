import {
  Calendar,
  Car,
  CircleDollarSign,
  Clock,
  MapPin,
  Search,
  UserRound,
} from "lucide-react";
import React from "react";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { Button } from "../../components/ui/button";
import FilterSection from "./FilterSection";
import Link from "next/link"; // Import the Link component

function Listing({
  listing = [],
  handleSearchClick,
  setDepartureAddress,
  setArrivalAddress,
  setDepartureCoordinates,
  setArrivalCoordinates,
  searchPerformed,
  searchDate,
  setSearchDate,
  setPassengerCount,
  setRideFrequency,
}) {
  // Handle date change
  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  // Reusable component for trip details (departure/arrival)
  const TripDetail = ({ icon: Icon, text }) => (
    <h2 className="flex gap-2 text-sm text-gray-400">
      <Icon className="h-4 w-4" />
      {text}
    </h2>
  );

  // Reusable component for meta details (passenger, price, frequency)
  const TripMeta = ({ icon: Icon, text }) => (
    <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center">
      <Icon className="h-4 w-4" />
      {text}
    </h2>
  );

  return (
    <div>
      <div className="mt-2 flex flex-col gap-4">
        {/* Address Inputs */}
        <GoogleAddressSearch
          label="Enter departure address"
          selectedAddress={setDepartureAddress}
          setCoordinates={setDepartureCoordinates}
        />
        <GoogleAddressSearch
          label="Enter arrival address"
          selectedAddress={setArrivalAddress}
          setCoordinates={setArrivalCoordinates}
        />

        {/* Date Picker */}
        <div className="flex items-center w-full">
          <Calendar className="h-10 w-10 p-2 rounded-l-lg text-primary bg-green-200" />
          <input
            type="date"
            id="date"
            value={searchDate}
            onChange={handleDateChange}
            className="px-3 py-1.5 border border-gray-300 mt-[-2px] focus:outline-none w-full rounded-r-lg"
          />
        </div>

        {/* Search Button */}
        <Button className="flex gap-2 mt-2 text-base" onClick={handleSearchClick}>
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>

      <FilterSection setPassengerCount={setPassengerCount} setRideFrequency={setRideFrequency} />

      {/* Search Results */}
      {searchPerformed && (
        <div className="px-3 mt-4 font-semibold text-lg">
          {listing.length > 0
            ? `Found ${listing.length} trip${listing.length > 1 ? "s" : ""} matched.`
            : "No trips matched."}
        </div>
      )}

      {/* Render listing items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {listing.length > 0
          ? listing.map((item, index) => (
              <Link href={`/view-listing/${item.id}`} key={index}> {/* Wrap the listing item with Link */}
                <div className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg">
                  <div className="flex mt-2 flex-col gap-2">
                    <h2 className="font-bold text-xl">{item?.title}</h2>
                    <div className="flex gap-2 mt-2 justify-between">
                      <div>
                        <TripDetail icon={MapPin} text={item?.departureAddress} />
                        <TripDetail icon={MapPin} text={item?.arrivalAddress} />
                      </div>
                      <div>
                        <TripDetail icon={Calendar} text={item?.date} />
                        <TripDetail icon={Clock} text={item?.time} />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2 justify-between">
                      <TripMeta icon={UserRound} text={item?.passenger} />
                      <TripMeta
                        icon={CircleDollarSign}
                        text={typeof item?.price === "number" ? `$${item.price}` : item?.price}
                      />
                      <TripMeta icon={Car} text={item?.frequency} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-[230px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
            ))}
      </div>
    </div>
  );
}

export default Listing;