"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const path = usePathname();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    console.log(path);
  }, [path]); // Track pathname change on each update

  return (
    <div className="p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-12 items-center">
        <Image src={"/car.svg"} width={100} height={100} alt="car icon" />
        <ul className="hidden md:flex gap-10">
          {/* Ride Offer Link */}
          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path === "/" ? "text-primary" : ""
              }`}
            >
              Ride Offer
            </li>
          </Link>

          {/* Ride Request Link */}
          <Link href={"/ride-request"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path === "/ride-request" ? "text-primary" : ""
              }`}
            >
              Ride Request
            </li>
          </Link>

          {/* Agent Finder Link */}
          <Link href={"/agent-finder"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path === "/agent-finder" ? "text-primary" : ""
              }`}
            >
              Agent Finder
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <Button className="flex gap-2">
          <Plus className="h-5 w-5" /> Post Your Ride
        </Button>
        {isSignedIn ? <UserButton /> :
        <Link href={'/sign-in'}>
        <Button variant="outline">Login</Button>
        </Link>
        }
      </div>
    </div>
  );
}

export default Header;
