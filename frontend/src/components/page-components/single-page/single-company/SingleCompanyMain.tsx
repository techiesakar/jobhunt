"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NewsLetter from "@/components/ui/aside/NewsLetter";
import SocialLinks from "@/components/SocialLinks";
import SingleCompanyFooter from "./SingleCompanyFooter";
import SingleCompanyArticle from "./SingleCompanyArticle";

import JobCard from "../../jobs/JobCard";

const SingleCompanyMain = ({ company }: any) => {
  const [anotherClicked, setAnotherClicked] = useState(false);

  return (
    <div className="bg-white">
      <header className="flex flex-col gap-6 pt-14 huntContainer ">
        <div className="flex-col flexBetween md:flex-row ">
          <div className="flex items-center gap-4 lg:gap-8">
            <h1 className="text-2xl font-medium"> {company.company_name}</h1>
          </div>
          <SocialLinks />
        </div>
        <div className="flex gap-6 ">
          <button
            onClick={() => setAnotherClicked(false)}
            className={`font-medium  py-3 border-b-2  transition ${
              anotherClicked
                ? "text-gray-600  border-b-transparent hover:border-blue-600"
                : "text-blue-600 border-b-2 border-blue-600 "
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setAnotherClicked(true)}
            className={`font-medium py-3 border-b-2  transition ${
              !anotherClicked
                ? "text-gray-600  border-b-transparent hover:border-blue-600"
                : "text-blue-600 border-b-2 border-blue-600 "
            }`}
          >
            Jobs
          </button>
        </div>
      </header>

      <section className="py-6 bg-gray-50 lg:py-10">
        <div className="grid gap-10 huntContainer lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-9">
            {!anotherClicked ? (
              <SingleCompanyArticle
                title={company.company_name}
                description={company.description}
              />
            ) : (
              <div className="grid gap-6">
                {company?.jobs.map((job: any, index: number) => {
                  return (
                    <JobCard
                      key={index}
                      title={job.name}
                      salary={
                        job.job_salary.length > 0
                          ? job.job_salary
                          : "Negotiable"
                      }
                      role={job.job_role.length > 0 ? job.job_role : "other"}
                      categories={company.categories}
                      date_posted={job.createdAt}
                      slug={job.id}
                      locations={job.locations}
                    />
                  );
                })}
              </div>
            )}

            {(!anotherClicked && company.technologies.length > 0) ||
              (company.benefits.length > 0 && (
                <SingleCompanyFooter
                  technologies={company.technologies}
                  benefits={company.benefits}
                />
              ))}
          </div>
          <aside className="relative flex flex-col gap-6 lg:col-span-3">
            <div className="flex flex-col gap-3 p-6 bg-white rounded-md">
              <h2 className="text-2xl font-bold">Company info</h2>
              {company?.ceo_name && (
                <div className="flex flex-col ">
                  <p className="font-bold text-gray-500">CEO</p>
                  <div className="font-gray-600">{company.ceo_name}</div>
                </div>
              )}
              {company?.company_phone && (
                <div className="flex flex-col ">
                  <p className="font-bold text-gray-500">Phone</p>
                  <div className="font-gray-600">{company.company_phone}</div>
                </div>
              )}
              {company?.company_email && (
                <div className="flex flex-col ">
                  <p className="font-bold text-gray-500">Email</p>
                  <div className="font-gray-600">{company.company_email}</div>
                </div>
              )}
              {company?.date_founded && (
                <div className="flex flex-col ">
                  <p className="font-bold text-gray-500">Founded in</p>
                  <div className="font-gray-600">
                    {new Date(company.date_founded).getFullYear()}
                  </div>
                </div>
              )}
              <div>
                <p className="font-bold text-gray-600">Markets</p>
                <ul className="flex flex-wrap gap-3">
                  <li>
                    <Link
                      className="px-2 py-1 text-sm text-blue-600 transition bg-blue-100 rounded hover:text-white hover:bg-blue-600"
                      href="/"
                    >
                      eCommerce
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="px-2 py-1 text-sm text-blue-600 transition bg-blue-100 rounded hover:text-white hover:bg-blue-600"
                      href="/"
                    >
                      Enterprise Software
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="px-2 py-1 text-sm text-blue-600 transition bg-blue-100 rounded hover:text-white hover:bg-blue-600"
                      href="/"
                    >
                      Software Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="px-2 py-1 text-sm text-blue-600 transition bg-blue-100 rounded hover:text-white hover:bg-blue-600"
                      href="/"
                    >
                      Web Development
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-600">Countries</p>
                <ul className="flex flex-wrap gap-3">
                  <li>
                    <Link
                      className="px-2 py-1 text-sm text-purple-600 transition bg-purple-100 rounded hover:text-white hover:bg-purple-600"
                      href="/"
                    >
                      Australias
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="px-2 py-1 text-sm text-purple-600 transition bg-purple-100 rounded hover:text-white hover:bg-purple-600"
                      href="/"
                    >
                      Brazil
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="px-2 py-1 text-sm text-purple-600 transition bg-purple-100 rounded hover:text-white hover:bg-purple-600"
                      href="/"
                    >
                      Canada
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="px-2 py-1 text-sm text-purple-600 transition bg-purple-100 rounded hover:text-white hover:bg-purple-600"
                      href="/"
                    >
                      South Africa
                    </Link>
                  </li>
                </ul>
              </div>
              <div></div>
            </div>
            <div className="sticky top-0">
              <NewsLetter />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default SingleCompanyMain;
