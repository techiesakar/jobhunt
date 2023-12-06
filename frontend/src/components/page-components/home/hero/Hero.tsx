"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import HeroSkeleton from "./customSkeleton/HeroSkeleton";
import Link from "next/link";

const Hero = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <>
      {loading ? (
        <HeroSkeleton />
      ) : (
        <section className="pt-6 bg-white md:pt-14 dark:bg-gray-900">
          <div className="gap-16 huntContainer flexBetween ">
            <div className="flex flex-col w-full gap-5 py-6 lg:w-1/2 xl:gap-8">
              <h2 className="huntHead">
                Discover Opportunities, Find Your Dream Job Today!
              </h2>

              <p className="huntPara">
                Unlock a World of Career Possibilities with JobHunt - Your Guide
                to Finding the Perfect Job and Building a Fulfilling Career.
              </p>
              <button
                type="button"
                className="gap-2 px-6 py-3 font-semibold text-white transition bg-blue-700 rounded-md w-fit hover:bg-gray-900 md:px-8 md:py-4 flexCenter"
              >
                <BsSearch /> <Link href="/jobs">Find a job</Link>
              </button>
            </div>

            <div className="justify-end hidden lg:w-1/2 md:flex">
              <Image
                src="/hero.jpg"
                alt="Hero Image"
                width={500}
                height={700}
                className="w-[500] h-[700]"
                loading="eager"
                priority={true}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Hero;
