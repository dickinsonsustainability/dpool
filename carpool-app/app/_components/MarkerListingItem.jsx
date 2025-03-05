import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Clock, UserRound, CircleDollarSign, Car, X, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

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

function MarkerListingItem({ items, closeHandler }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const currentItem = items[currentIndex];

  return (
    <div className="rounded-lg w-[180px] bg-white shadow-lg p-2">
      <div className="flex justify-end">
        <X className="h-4 w-4 cursor-pointer" onClick={closeHandler} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-xl">{currentItem?.title}</h2>
        <div className="flex gap-2 justify-between">
          <div>
            <TripDetail icon={MapPin} text={currentItem?.departureAddress} />
            <TripDetail icon={MapPin} text={currentItem?.arrivalAddress} />
          </div>
          <div>
            <TripDetail icon={Calendar} text={currentItem?.date} />
            <TripDetail icon={Clock} text={currentItem?.time} />
          </div>
        </div>
        <div className="flex gap-2 justify-between">
          <TripMeta icon={UserRound} text={currentItem?.passenger} />
          <TripMeta
            icon={CircleDollarSign}
            text={typeof currentItem?.price === "number" ? `$${currentItem.price}` : currentItem?.price}
          />
          {/* <TripMeta icon={Car} text={currentItem?.frequency} /> */}
        </div>
        <Button size="sm" className="mt-2">View Detail</Button>
      </div>
      <div className="flex justify-between mt-2">
        <ChevronLeft className="h-4 w-4 cursor-pointer" onClick={handlePrevious} />
        <ChevronRight className="h-4 w-4 cursor-pointer" onClick={handleNext} />
      </div>
    </div>
  );
}

export default MarkerListingItem;