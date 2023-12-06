import SingleJobMain from "@/components/page-components/single-page/single-job/SingleJobMain";
import React from "react";
async function getJob(slug: string) {
  const res = await fetch(`http://localhost:4002/job/${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const Page = async ({ params }: { params: any }) => {
  const { slug } = params;
  const job = await getJob(slug);
  return <SingleJobMain job={job.result} />;
};

export default Page;
