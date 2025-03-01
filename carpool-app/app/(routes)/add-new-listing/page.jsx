'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

function AddNewListing() {
    const [departureAddress, setDepartureAddress] = useState(null);
    const [arrivalAddress, setArrivalAddress] = useState(null);
    const [departureCoordinates, setDepartureCoordinates] = useState(null);
    const [arrivalCoordinates, setArrivalCoordinates] = useState(null);
    const [loader, setLoader] = useState(false);
    
    const { user } = useUser();
    const router = useRouter();

    const nextHandler = async () => {
        if (!departureAddress || !arrivalAddress || !departureCoordinates || !arrivalCoordinates) {
            toast.error("Please enter all required details.");
            return;
        }

        setLoader(true);

        try {
            const { data, error } = await supabase
                .from('listing')
                .insert([
                    {
                        departureAddress: departureAddress.label,
                        arrivalAddress: arrivalAddress.label,
                        departureCoordinates,
                        arrivalCoordinates,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        type: 'ride',
                    },
                ])
                .select();

            if (error) throw error;

            setLoader(false);
            toast.success(`New listing added: ${departureAddress.label} → ${arrivalAddress.label}`);
            router.replace(`/edit-listing/${data[0].id}`);
        } catch (error) {
            setLoader(false);
            console.error("Database error:", error.message);
            toast.error("Failed to add listing. Please try again.");
        }
    };

    return (
        <div className='mt-10 md:mx-56 lg:mx-80'>
            <div className='p-10 flex flex-col gap-5 items-center justify-center'>
                <h2 className='font-bold text-2xl'>Add New Listing</h2>
                <div className='p-10 rounded-lg border w-full shadow-md flex flex-col gap-6'>
                    <h2 className='text-gray-500'>Enter Departure and Arrival Addresses</h2>

                    {/* Departure Address Input */}
                    <GoogleAddressSearch
                        label="From"
                        selectedAddress={setDepartureAddress}
                        setCoordinates={setDepartureCoordinates}
                    />

                    {/* Arrival Address Input */}
                    <GoogleAddressSearch
                        label="To"
                        selectedAddress={setArrivalAddress}
                        setCoordinates={setArrivalCoordinates}
                    />

                    {/* Next Button */}
                    <Button
                        disabled={loader || !departureAddress || !arrivalAddress || !departureCoordinates || !arrivalCoordinates}
                        onClick={nextHandler}
                    >
                        {loader ? <Loader className='animate-spin' /> : 'Next'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AddNewListing;
