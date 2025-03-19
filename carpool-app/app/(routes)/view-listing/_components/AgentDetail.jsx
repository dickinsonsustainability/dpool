import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function AgentDetail({ listingDetail }) {
  // Function to copy the agent's email to the clipboard
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
    <div className="flex gap-5 items-center justify-between p-5 rounded-lg shadow-md border my-6">
      <div className="flex items-center gap-6">
        <Image
          src={listingDetail?.profileImage}
          alt="profileImage"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <h2 className="text-lg font-bold">
            {listingDetail?.firstName} {listingDetail?.lastName}
          </h2>
          <h2 className="text-gray-500">{listingDetail?.createdBy}</h2>
        </div>
      </div>
      <Button onClick={copyEmail}>Send Message</Button>
    </div>
  );
}

export default AgentDetail;
