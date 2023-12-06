import React from "react";

const CompanyCard = ({ company, className }: any) => {
  return (
    <div
      className={`h-[200px] flex flex-col items-center justify-between gap-3 p-8 bg-white  rounded-2xl  border-2 border-gray-200 ${className}`}
    >
      <img
        className="object-cover w-12 h-12"
        src={`http://localhost:4002/public/${company.image}`}
        alt=""
      />
      <h2 className="text-sm font-medium text-center text-gray-500 uppercase ">
        {company.company_name}
      </h2>
      {company?.jobs && (
        <span className="inline-block px-3 py-1 text-xs bg-gray-200 rounded-md">
          {company.jobs.length} Jobs
        </span>
      )}

      <ul className="flex flex-wrap gap-3">
        {company?.categories.map((category: any, index: number) => {
          return (
            <li
              className="px-2 py-1 text-xs text-blue-600 capitalize transition bg-blue-100 rounded hover:text-white hover:bg-blue-600"
              key={index}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CompanyCard;
