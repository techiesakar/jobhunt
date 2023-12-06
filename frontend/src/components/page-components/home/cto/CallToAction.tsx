"use client";
import dynamic from "next/dynamic";
import Cookies from "js-cookie"; // Import the Cookies library

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useLoginStatusContext } from "@/hoc/context/LoginStatusContextProvicer";

const CallToAction = () => {
  const { isLoggedIn } = useLoginStatusContext();
  return (
    <div className="mt-10 bg-white">
      <div className="flex flex-col justify-center p-8 bg-gray-100 huntContainer rounded-3xl">
        <div className="inline-flex justify-center gap-10">
          <button className="px-8 py-2 mt-8 text-gray-600 transition-all border-2 border-gray-600 rounded-md hover:bg-gray-200 w-fit">
            {isLoggedIn ? (
              <Link
                href="/submit-job"
                className="flex items-center justify-between gap-3"
              >
                <span>Post Job</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-between gap-3"
              >
                <span>Sign in</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </Link>
            )}
          </button>
          {!isLoggedIn && (
            <button className="px-8 py-2 mt-8 text-white transition-all ] border-2 rounded-md bg-[#072669] hover:bg-[#0d307a] w-fit">
              <Link
                href="/create-company"
                className="flex items-center justify-between gap-3"
              >
                <span>Register as Employeer</span>
              </Link>
            </button>
          )}
        </div>
        <p className="mt-6 text-center">
          {isLoggedIn
            ? "Unlock your company's potential by posting your latest job opportunities and connecting with top talent today. Post your job now!"
            : "Sign in to manage your Jobhunt Profile, save searches and view your recommended jobs"}
        </p>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CallToAction), { ssr: false });
