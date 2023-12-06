import axios from "@/hoc/axios";
import Aside from "@/components/page-components/companies/Aside";
import Link from "next/link";
import React from "react";
import { CiLocationOn } from "react-icons/ci";

async function getJobs() {
  try {
    const res = await axios.get("company");
    return res.data.result;
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

const page = async () => {
  const allCompanies = await getJobs();
  return (
    <section className="py-10 huntContainer">
      <div className="relative grid gap-6 md:grid-cols-12 lg:gap-20">
        <div className="relative flex flex-col col-span-9 gap-4">
          <h2 className="text-2xl font-medium text-gray-800 uppercase">
            Companies
          </h2>
          {allCompanies.map((val: any, index: number) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 border rounded-md shadow"
            >
              {val.image && (
                <img
                  className="object-cover w-16 h-16 rounded-full"
                  src={`http://localhost:4002/public/${val.image}`}
                  alt=""
                />
              )}

              <h2 className="font-medium text-gray-500 uppercase ">
                <Link href={`/companies/${val.id}`}>{val.company_name}</Link>
              </h2>
              <div className="flex justify-between w-full">
                <ul className="flex flex-wrap w-1/2 gap-3 m-0 ">
                  {val.categories.map((category: any, index: number) => {
                    return (
                      <li
                        className="px-2 py-1 text-xs text-blue-600 capitalize transition-all bg-blue-100 rounded cursor-pointer hover:text-white hover:bg-blue-600"
                        key={index}
                      >
                        {category.name}
                      </li>
                    );
                  })}
                </ul>
                <div className="w-1/2">
                  <ul className="flex flex-wrap justify-end gap-2 m-0">
                    <li>
                      <CiLocationOn />
                    </li>
                    {val.locations.map((location: any, index: number) => {
                      return (
                        <li
                          className="text-xs text-blue-600 capitalize transition-all rounded cursor-pointer "
                          key={index}
                        >
                          {location.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Aside />
      </div>
    </section>
  );
};

export default page;
