import SingleCompanyMain from "@/components/page-components/single-page/single-company/SingleCompanyMain";

async function getCompany(slug: string) {
  const res = await fetch(`http://localhost:4002/company/${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const Page = async ({ params }: { params: any }) => {
  const { slug } = params;
  const company = await getCompany(slug);

  return <SingleCompanyMain company={company.result} />;
};

export default Page;
