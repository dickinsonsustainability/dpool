import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function AgentDetail({ listingDetail }) {
  const sendEmail = () => {
    const subject = encodeURIComponent("Ride Inquiry from DPool");
    const body = encodeURIComponent("Hi, I'm interested in your ride listing on DPool!");
    const email = listingDetail?.email;

    if (email) {
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    } else {
      alert("No email address available.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-start md:items-center justify-between p-4 rounded-lg shadow-md border my-6">
      <div className="flex gap-4 items-start md:items-center">
        <Image
          src={listingDetail?.profileImage}
          alt="profileImage"
          width={60}
          height={60}
          className="rounded-full object-cover"
        />
        <div>
          <h2 className="text-base md:text-lg font-bold">
            {listingDetail?.firstName} {listingDetail?.lastName}
          </h2>
          <h2 className="text-sm text-gray-500 break-all">{listingDetail?.createdBy}</h2>
        </div>
      </div>

      <Button onClick={sendEmail} className="w-full md:w-auto">
        Send Message
      </Button>
    </div>
  );
}

export default AgentDetail;