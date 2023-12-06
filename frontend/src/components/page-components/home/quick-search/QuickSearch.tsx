"use client";
import { useCategoryContext } from "@/hoc/context/CategoryContextProvider";
import { useLocationContext } from "@/hoc/context/LocationContextProvider";
import React from "react";

const QuickSearch = () => {
  const { allLocations } = useLocationContext();
  const { allCategories } = useCategoryContext();
  return (
    <div className="my-10 text-[12px] bg-white">
      <div className="flex flex-col gap-2 huntContainer">
        <p className="font-medium">Quick Search</p>
        <div className="flex gap-4 text-[12px]">
          <h2 className="w-[100px]">Classifications</h2>
          <ul className="flex gap-6 list-disc">
            {allCategories.map((val: any, index: number) => {
              if (index < 5) {
                return (
                  <li
                    key={index}
                    className="text-[12px] capitalize text-gray-600 "
                  >
                    {val.name}
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="flex gap-4 text-[12px]">
          <h2 className="w-[100px]">Major Cities</h2>
          <ul className="flex gap-6 list-disc">
            {allLocations.map((val: any, index: number) => {
              if (index < 5) {
                return (
                  <li
                    key={index}
                    className="text-[12px] capitalize text-gray-600 "
                  >
                    {val.name}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
