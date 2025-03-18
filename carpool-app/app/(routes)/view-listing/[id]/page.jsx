'use client'; // Mark the component as a Client Component
// import { supabase } from "@/utils/supabase/client"
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Details from '../_components/Details';

function ViewListing({ params }) {
  const [listingDetail, setListingDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Unwrap the params object using React.use()
  const unwrappedParams = React.use(params);
  const listingId = unwrappedParams.id;

  useEffect(() => {
    if (listingId) {
      GetListingDetail();
    } else {
      toast('Invalid listing ID');
      setLoading(false);
    }
  }, [listingId]); // Re-fetch if listingId changes

  const GetListingDetail = async () => {
    try {
      const { data, error } = await supabase
        .from('listing')
        .select('*')
        .eq('id', listingId)
        .eq('active', true)
        .single(); // Use .single() if you expect only one record

      if (error) {
        throw error;
      }

      if (data) {
        setListingDetail(data);
        console.log("Fetched Data:", data); // Log the fetched data
      } else {
        toast('Listing not found or inactive');
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Log the error
      toast('Server side error!');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!listingDetail) {
    return <p>No listing found.</p>;
  }

  return (
    <div className='px-4 md:px-32 lg:px-56 my-3 mt-5'>
     <Details listingDetail={listingDetail}/>
    </div>
  );
}

export default ViewListing; // Explicit export at the end