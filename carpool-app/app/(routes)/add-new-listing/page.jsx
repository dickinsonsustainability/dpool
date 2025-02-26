'use client'
import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch';
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';


function AddNewListing() {
    const [departureAddress, setDepartureAddress] = useState();
    const [arrivalAddress, setArrivalAddress] = useState();
    const [departureCoordinates, setDepartureCoordinates] = useState();
    const [arrivalCoordinates, setArrivalCoordinates] = useState();
    const {user} = useUser();
    const [loader, setLoader] = useState(false);
    const router=useRouter();

    const nextHandler = async () => {
        setLoader(true);

        const { data, error } = await supabase
            .from('listing')
            .insert([
                {
                    departureAddress: departureAddress.label,
                    arrivalAddress: arrivalAddress.label,
                    departureCoordinates: departureCoordinates,
                    arrivalCoordinates: arrivalCoordinates,
                    createdBy: user?.primaryEmailAddress.emailAddress,
                },
            ])
            .select();

        if (data) {
            setLoader(false);
            console.log("New Data added,", data);
            toast("New listing added");
            router.replace('/edit-listing/'+data[0].id);
        }
        if (error) {
            setLoader(false);
            console.log('Error');
            toast("Server side error");
        }
    }

    return (
        <div className='mt-10 md:mx-56 lg:mx-80'>
            <div className='p-10 flex flex-col gap-5 items-center justify-center'>
                <h2 className='font-bold text-2xl'>Add New Listing</h2>
                <div className='p-10 rounded-lg border w-full shadow-md flex flex-col gap-6'>
                    <h2 className='text-gray-500'>Enter Departure and Arrival Addresses</h2>

                    {/* Departure Address Input */}
                    <GoogleAddressSearch
                        label="From"
                        selectedAddress={(value) => setDepartureAddress(value)}
                        setCoordinates={(value) => setDepartureCoordinates(value)}
                    />

                    {/* Arrival Address Input */}
                    <GoogleAddressSearch
                        label="To"
                        selectedAddress={(value) => setArrivalAddress(value)}
                        setCoordinates={(value) => setArrivalCoordinates(value)}
                    />

                    <Button
                        disabled={!departureAddress || !arrivalAddress || !departureCoordinates || !arrivalCoordinates}
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
