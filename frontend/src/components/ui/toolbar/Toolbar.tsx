"use client";
import React, { useEffect, useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import Branding from "@/components/Branding";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import PrimaryMenu from "./PrimaryMenu";
import MobileMenu from "./MobileMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { useLoginStatusContext } from "@/hoc/context/LoginStatusContextProvicer";

const Toolbar = () => {
  const { isLoggedIn, setIsLoggedIn, change, setChange } =
    useLoginStatusContext();

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    setChange(!change);
  };
  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  const [headerPosition, setHeaderPosition] = useState("");
  useEffect(() => {
    const scrollPosition = () => {
      scrollY >= 100 ? setHeaderPosition("scrolled") : setHeaderPosition("");
    };
    window.addEventListener("scroll", scrollPosition);
  }, [headerPosition]);

  const pathname = usePathname();

  return (
    <header
      className={`${
        pathname === "/login" && "hidden"
      } border-b sticky dark:bg-gray-900  inset-x-0 z-50 bg-white border-gray-200 dark:border-gray-600 h-20 flex items-center ${headerPosition}`}
    >
      <div className="h-full flexBetween huntContainer">
        <Branding />
        <div className="h-full gap-6 flexBetween lg:gap-8 ">
          <PrimaryMenu />
          <button className="hidden px-4 py-2 text-white transition-all bg-indigo-600 border-2 border-indigo-600 rounded-md md:inline-block hover:bg-indigo-700">
            <Link href="/submit-job" className="">
              Post a Job
            </Link>
          </button>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuSeparator />

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button onClick={() => handleLogout()}>Logout</button>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button className="px-4 py-2 text-indigo-600 transition-all bg-white border-2 border-indigo-600 rounded-md hover:bg-gray-100">
              <Link href="/login" className="">
                Sign in
              </Link>
            </button>
          )}
          <button
            onClick={() => setMenuToggle(!menuToggle)}
            type="button"
            className="inline-block text-2xl md:hidden "
          >
            <AiOutlineMenu />
          </button>
        </div>
      </div>
      {/* Header Mobile Start */}
      <MobileMenu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
    </header>
  );
};

export default dynamic(() => Promise.resolve(Toolbar), { ssr: false });
