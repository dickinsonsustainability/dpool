import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function AgentDetail({ listingDetail }) {
  const copyEmail = () => {
    navigator.clipboard.writeText(listingDetail?.email)
      .then(() => {
        alert("Driver's email copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying email:", error);
        alert("Failed to copy email.");
      });
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

      <Button onClick={copyEmail} className="w-full md:w-auto">
        Send Message
      </Button>
    </div>
  );
}

export default AgentDetail;