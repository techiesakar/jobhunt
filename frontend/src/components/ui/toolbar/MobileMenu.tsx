import React, { useState, useEffect, useRef } from "react";
import { NavLinks } from "@/data/navData";
import Link from "next/link";
import Branding from "@/components/Branding";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import SocialLinks from "@/components/SocialLinks";

type Props = {
  menuToggle: boolean;
  setMenuToggle: any;
};

const MobileMenu = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        props.setMenuToggle(false);
      }
    };
    const handleToggleScroll = () => {
      if (props.menuToggle) {
        document.body.classList.add("disable-scroll");
      } else {
        document.body.classList.remove("disable-scroll");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    handleToggleScroll();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      handleToggleScroll();
    };
  }, [props.menuToggle]);

  const handleClick = () => {
    props.setMenuToggle(!props.menuToggle);
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={`absolute  block md:hidden  w-full  bg-white top-0  z-[100] p-3  transition-all duration-300 ease-in-out rounded-md shadow  ${
        props.menuToggle ? "left-0" : "left-full"
      }`}
    >
      <div className="flex flex-col gap-6 p-4 border border-gray-200">
        <div className="bg-white flexBetween">
          <Branding />
          <button
            onClick={handleClick}
            type="button"
            className="p-2 text-xl text-gray-600 transition bg-white rounded-full hover:bg-gray-50"
          >
            <AiOutlineClose />
          </button>
        </div>
        <nav>
          <ul className="flex flex-col gap-4 pb-4 border-b border-gray-200 md:hidden">
            {NavLinks.map((item, index) => {
              return (
                <li className="font-semibold " key={index}>
                  <Link
                    className="transition-colors hover:text-blue-700"
                    href={item.link ? item.link : "/"}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Button
          asChild
          className="inline-block px-5 py-2 font-semibold text-white transition ease-in-out bg-blue-700 rounded-md w-fit hover:bg-gray-100 hover:text-gray-800"
          variant="outline"
        >
          <Link href="/submit-job">Post a job</Link>
        </Button>
        <SocialLinks />
      </div>
    </div>
  );
};
export default MobileMenu;
