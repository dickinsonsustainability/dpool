import { Calendar, CircleDollarSign, Clock, MapPin, UserRound } from "lucide-react";
import React from "react";

function Listing({ listing = [] }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listing.length > 0
          ? listing.map((item, index) => (
              <div key={index} className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg">
                <div className="flex mt-2 flex-col gap-2">
                  <h2 className="font-bold text-xl">{item?.title}</h2>
                  <div className="flex gap-2 mt-2 justify-between">
                    <div>
                      <h2 className="flex gap-2 text-sm text-gray-400">
                        <MapPin className="h-4 w-4" />
                        {item?.departureAddress}
                      </h2>
                      <h2 className="flex gap-2 text-sm text-gray-400">
                        <MapPin className="h-4 w-4" />
                        {item?.arrivalAddress}
                      </h2>
                    </div>
                    <div>
                      <h2 className="flex gap-2 text-sm text-gray-400">
                        <Calendar className="h-4 w-4" />
                        {item?.date}
                      </h2>
                      <h2 className="flex gap-2 text-sm text-gray-400">
                        <Clock className="h-4 w-4" />
                        {item?.time}
                      </h2>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 justify-between">
                    <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center">
                      <UserRound className="h-4 w-4" />
                      {item?.passenger}
                    </h2>
                    <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center">
                      <CircleDollarSign className="h-4 w-4" />
                      {typeof item?.price === "number" ? `$${item.price}` : item?.price}
                    </h2>
                  </div>
                </div>
              </div>
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-[230px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
            ))}
      </div>
    </div>
  );
}

export default Listing;
