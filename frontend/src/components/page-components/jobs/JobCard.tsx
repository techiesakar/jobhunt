"use client";
import { AiOutlineDollar } from "react-icons/ai";
import { format } from "date-fns";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";

const JobCard = ({
  title,
  salary,
  date_posted,
  role,
  slug,
  categories,
  locations,
}: any) => {
  // const formattedDate = format(new Date(date_posted), "MMMM dd, yyyy");
  console.log(locations);

  return (
    <div className="flex flex-col gap-6 p-4 bg-white rounded-md shadow job-card lg:flex-row dark:bg-gray-800">
      <div className="flex justify-between flex-1 gap-3">
        <div className="flex flex-col gap-2">
          <div className="flexBetween">
            <Link href={`/jobs/${slug}`}>
              <h2 className="text-xl font-medium">{title}</h2>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-800">
            <span className="capitalize dark:text-white">{role}</span>
            <span className="flex items-center gap-2 text-gray-500 dark:text-white">
              <AiOutlineDollar />
              {salary}
            </span>
          </div>
          <ul className="flex flex-wrap gap-3">
            {categories.map((category: any, index: number) => {
              return (
                <li
                  className="px-2 py-1 text-xs text-blue-600 capitalize transition-all duration-200 bg-blue-100 rounded cursor-pointer hover:text-white hover:bg-blue-600"
                  key={index}
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-wrap items-center gap-1">
            <li className="text-xs text-blue-600 capitalize transition-all duration-200 rounded cursor-pointer ">
              <CiLocationOn />
            </li>
            {locations?.map((location: any, index: number) => {
              return (
                <li
                  className="text-xs text-blue-600 capitalize transition-all duration-200 rounded cursor-pointer "
                  key={index}
                >
                  {location.name} {locations.length - 1 != index && ","}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <button className="p-3 text-sm text-white transition-all bg-indigo-600 border-indigo-600 rounded-md hover:bg-indigo-700">
            <Link href={`/jobs/${slug}`}>View Job</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
