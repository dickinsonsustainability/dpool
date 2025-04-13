"use client";

import React, { useEffect } from "react";
import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const path = usePathname();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    console.log(path);
  }, [path]); // Track pathname change on each update

  return (
    <div className="p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-12 items-center">
        <Link href={"/"} className="hidden md:block">
          <Image
            src={"/car.svg"}
            width={100}
            height={100}
            alt="car icon"
            priority
          />
        </Link>

        {/* Dropdown for small screens */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={"/car.svg"} // Using the same car icon for dropdown trigger
                width={100}
                height={100}
                alt="car icon"
                className="cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className={path === "/ride-offer" ? "text-primary font-bold" : ""}>
                <Link href={"/ride-offer"}>Ride Offer</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className={path === "/ride-request" ? "text-primary font-bold" : ""}>
                <Link href={"/ride-request"}>Ride Request</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/add-new-listing"}> <Button className="font-semibold">
                    Post Your Ride
                  </Button></Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Links for larger screens */}
        <ul className="hidden md:flex gap-10">
          {/* Ride Offer Link */}
          <Link href={"/ride-offer"}>
            <li
              className={`hover:text-primary text-base font-semibold cursor-pointer ${
                path === "/ride-offer" || path === "/" ? "text-primary" : ""
              }`}
            >
              Ride Offer
            </li>
          </Link>

          {/* Ride Request Link */}
          <Link href={"/ride-request"}>
            <li
              className={`hover:text-primary text-base font-semibold cursor-pointer ${
                path === "/ride-request" ? "text-primary" : ""
              }`}
            >
              Ride Request
            </li>
          </Link>

          {/* Agent Finder Link */}
          {/* <Link href={"/agent-finder"}>
            <li
              className={`hover:text-primary text-base font-semibold cursor-pointer ${
                path === "/agent-finder" ? "text-primary" : ""
              }`}
            >
              Agent Finder
            </li>
          </Link> */}
        </ul>
      </div>
      <div className="flex gap-2 items-center">
         {/* Post Your Ride button only visible on larger screens */}
         <div className="hidden md:block">
        <Link href={"/add-new-listing"}>
          <Button className="flex gap-2 font-semibold text-base">
            <Plus className="h-5 w-5" /> Post Your Ride
          </Button>
        </Link>
        </div>
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user?.imageUrl}
                width={35}
                height={35}
                alt="user profile"
                className="rounded-full"
                style={{ width: "auto", height: "auto" }}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/user"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/guideline">Guideline</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/feedback">Feedback</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/sign-in"}>
            <Button variant="outline" className="font-semibold">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
