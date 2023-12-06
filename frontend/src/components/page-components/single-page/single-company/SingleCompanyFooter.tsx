import Link from "next/link";
import React from "react";

const SingleCompanyFooter = ({ technologies, benefits }: any) => {
  console.log(technologies);
  return (
    <footer className="flex flex-col gap-6 p-8 bg-white rounded-lg shadow">
      {technologies.length > 0 && (
        <div>
          <h2 className="mb-2 font-bold">Technologies</h2>
          <ul className="flex gap-3">
            {technologies.map((technology: any, index: number) => (
              <li>
                <Link
                  className="px-2 py-1 text-sm text-red-600 transition bg-red-100 rounded hover:text-white hover:bg-red-600"
                  href="/"
                >
                  {technology.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {benefits.length > 0 && (
        <div>
          <h2 className="mb-2 font-bold">Benefits</h2>
          <ul className="flex gap-3">
            {benefits.map((benefit: any, index: number) => (
              <li>
                <Link
                  className="px-2 py-1 text-sm text-red-600 transition bg-red-100 rounded hover:text-white hover:bg-red-600"
                  href="/"
                >
                  {benefit.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </footer>
  );
};

export default SingleCompanyFooter;
