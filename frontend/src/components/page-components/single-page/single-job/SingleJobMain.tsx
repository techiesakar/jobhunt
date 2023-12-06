import React from "react";
import SingleJobArticle from "./SingleJobArticle";
import { AiOutlineDollarCircle } from "react-icons/ai";
import SingleJobAside from "./SingleJobAside";
import Link from "next/link";

const SingleJobMain = ({ job }: any) => {
  return (
    <div className="bg-white">
      <header className="flex flex-col gap-6 pb-4 border-b pt-14 huntContainer">
        <div className="flex flex-col gap-4 lg:gap-4 ">
          <div className="flex flex-col gap-6">
            <h1 className="huntHead">{job.name}</h1>

            <div className="flex flex-row gap-6">
              <span className="font-bold">
                <Link href={`/companies/${job.company.id}`}>
                  {job?.company?.company_name}
                </Link>
              </span>
              <span className="flex items-center gap-2">
                <AiOutlineDollarCircle />{" "}
                {job?.salary ? job.salary : "Negotiable"}
              </span>
            </div>
          </div>
        </div>
      </header>
      <section className="py-6 lg:py-10">
        <div className="grid gap-6 huntContainer lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-8">
            <SingleJobArticle title={job.name} description={job.job_desc} />
          </div>
          <aside className="relative flex flex-col gap-6 lg:col-span-4">
            <SingleJobAside job={job} />
          </aside>
        </div>
      </section>
    </div>
  );
};

export default SingleJobMain;
