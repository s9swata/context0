"use client";

import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import logo from "../../../public/icons/context0_logo_cropped.jpeg";

export default function AppBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-gray-950 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        {/* Left side - Logo and Title */}
        <div className="flex items-center space-x-2">
          <a
            href="#"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
          >
            <img
              src={logo.src}
              alt="logo"
              width={50}
              height={50}
              className="rounded-md"
            />
            <span className=" text-white font-[bold] text-lg">Context0</span>
          </a>
        </div>

        {/* Right side - User Button */}
        <div className="ml-auto flex items-center">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
