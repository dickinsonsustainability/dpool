"use client";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState, useCallback } from "react";
import {
  Calendar,
  Car,
  CircleDollarSign,
  Clock,
  MapPin,
  Trash,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

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

function UserListing() {
  const { user, isLoaded } = useUser();
  const [listing, setListing] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);

  // Fetch user listings
  const GetUserListing = useCallback(async () => {
    if (!isLoaded || !user?.primaryEmailAddress?.emailAddress) return;

    const email = user.primaryEmailAddress.emailAddress.toLowerCase();
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", email);

    if (error) {
      console.error("Error fetching user listings:", error);
      return;
    }

    setListing(data || []);
  }, [user?.primaryEmailAddress?.emailAddress, isLoaded]);

  useEffect(() => {
    GetUserListing();
  }, [GetUserListing]);

  // Delete listing handler
  const handleDelete = async (id) => {
    const { error } = await supabase.from("listing").delete().eq("id", id);

    if (error) {
      console.error("Error deleting listing:", error);
    } else {
      setListing((prev) => prev.filter((item) => item.id !== id)); // Optimized state update
      setIsDialogOpen(false);
    }
  };

  //Archive listing handler
  const handleArchive = async (id) => {
    const { error } = await supabase
      .from("listing")
      .update({ active: false, status: "Completed" })
      .eq("id", id);

    if (error) {
      console.error("Error archiving listing:", error);
    } else {
      setListing((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="my-6">
      <h2 className="font-bold text-2xl">Manage Your Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {listing.length > 0 ? (
          listing.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg shadow hover:border-primary cursor-pointer relative"
            >
              <h2 className="bg-primary m-1 rounded-lg text-white absolute top-1 right-1 px-2 text-sm p-1 capitalize">
                {item?.status || "Draft"}
              </h2>

              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl">{item?.title}</h2>
                <div className="flex gap-2 mt-2 justify-between">
                  <div>
                    <TripDetail
                      icon={MapPin}
                      text={item?.departureAddress || "N/A"}
                    />
                    <TripDetail
                      icon={MapPin}
                      text={item?.arrivalAddress || "N/A"}
                    />
                  </div>
                  <div>
                    <TripDetail
                      icon={Calendar}
                      text={item?.date || "No date"}
                    />
                    <TripDetail icon={Clock} text={item?.time || "No time"} />
                  </div>
                </div>
                <div className="flex gap-2 mt-2 justify-between">
                  <TripMeta icon={UserRound} text={item?.passenger || "N/A"} />
                  <TripMeta
                    icon={CircleDollarSign}
                    text={
                      typeof item?.price === "number"
                        ? `$${item.price}`
                        : item?.price || "N/A"
                    }
                  />
                  <TripMeta icon={Car} text={item?.frequency || "N/A"} />
                </div>
              </div>
              <div className="flex gap-2 justify-between mt-4">
                <Link href={`/view-listing/${item.id}`} className="w-full">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 text-gray-700 w-full"
                  >
                    View
                  </Button>
                </Link>
                <Link href={`/edit-listing/${item.id}`} className="w-full">
                  <Button
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="default"
                  className="text-white w-full"
                  onClick={() => handleArchive(item.id)}
                >
                  Completed
                </Button>

                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        setSelectedListingId(item.id); // Set the listing ID for deletion
                        setIsDialogOpen(true); // Open the dialog
                      }}
                    >
                      <Trash />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this listing? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-2">No listings found.</p>
        )}
      </div>
    </div>
  );
}

export default UserListing;
