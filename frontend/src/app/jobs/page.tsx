import axios from "@/hoc/axios";
import React from "react";
import NewsLetter from "@/components/ui/aside/NewsLetter";
import JobCard from "@/components/page-components/jobs/JobCard";

import { Roboto } from "next/font/google";

async function getJobs() {
  try {
    const res = await axios.get("job");
    return res.data.result;
  } catch (err) {
    throw new Error("Failed to fetch data");
  }
}

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
const page = async () => {
  const allJobs = await getJobs();

  return (
    <section className="gap-8 bg-gray-100 py-14 lg:gap-12">
      <div className="grid gap-10 huntContainer lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-8">
          <div className={`grid gap-6 ${roboto.className}`}>
            <h2 className="text-2xl font-medium text-gray-800 uppercase">
              Jobs
            </h2>
            {allJobs?.map((job: any, index: number) => (
              <JobCard
                key={index}
                slug={job.id}
                title={job.name}
                salary={
                  job.job_salary.length > 0 ? job.job_salary : "Negotiable"
                }
                role={job.job_role.length > 0 ? job.job_role : "other"}
                categories={job.categories}
                date_posted={job.createdAt}
                locations={job.locations}
              />
            ))}
          </div>
        </div>
        <aside className="relative flex flex-col gap-6 lg:col-span-4">
          <div className="sticky top-0">
            <NewsLetter />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default page;
