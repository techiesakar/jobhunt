import Link from "next/link";
import React from "react";

const SingleJobAside = ({ job }: any) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-md">
      <h2 className="text-2xl font-bold">About the Job</h2>
      <div className="flex flex-col ">
        <p className="font-bold text-gray-500">Job Posted</p>
        <div className="font-gray-600">
          {new Date(job.createdAt).getFullYear()}
        </div>
      </div>
      <div className="flex flex-col ">
        <p className="font-bold text-gray-500 ">Job Type</p>
        <div className="capitalize font-gray-600">{job?.jobtypes[0]?.name}</div>
      </div>
      <div className="flex flex-col ">
        <p className="font-bold text-gray-500">Salary</p>
        <div className="font-gray-600">
          {job?.salary ? job.salary : "Negotiable"}
        </div>
      </div>

      {job?.locations.length > 0 && (
        <div>
          <p className="font-medium text-gray-600">Locations</p>
          <ul className="flex flex-wrap gap-3">
            {job?.locations.map((location: any, index: number) => {
              return (
                <li className="" key={index}>
                  <Link
                    className="px-2 py-1 text-sm text-blue-600 transition duration-300 bg-blue-100 rounded hover:text-white hover:bg-blue-600"
                    href="/"
                  >
                    {location.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {job?.categories.length > 0 && (
        <div>
          <p className="font-medium text-gray-600">Categories</p>
          <ul className="flex flex-wrap gap-3">
            {job?.categories.map((category: any, index: number) => {
              return (
                <li className="" key={index}>
                  <Link
                    className="px-2 py-1 text-sm text-blue-600 transition duration-300 bg-blue-100 rounded hover:text-white hover:bg-blue-600"
                    href="/"
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {job?.skills.length > 0 && (
        <div>
          <p className="font-medium text-gray-600">Skills Required</p>
          <ul className="flex flex-wrap gap-3">
            {job?.skills.map((skill: any, index: number) => {
              return (
                <li className="" key={index}>
                  <Link
                    className="px-2 py-1 text-xs text-red-600 capitalize transition duration-300 bg-red-100 rounded hover:text-white hover:bg-red-600"
                    href="/"
                  >
                    {skill.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {job?.benefits.length > 0 && (
        <div>
          <p className="font-medium text-gray-600">Skills Required</p>
          <ul className="flex flex-wrap gap-3">
            {job?.benefits.map((benefit: any, index: number) => {
              return (
                <li className="" key={index}>
                  <Link
                    className="px-2 py-1 text-xs text-purple-600 capitalize transition duration-300 bg-purple-100 rounded hover:text-white hover:bg-purple-600"
                    href="/"
                  >
                    {benefit.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SingleJobAside;
