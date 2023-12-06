import CompanyCard from "@/components/ui/company/CompanyCard";
import React from "react";
type titleType = {
  title?: string
}

const Companies = ({ title }: titleType) => {
  return (
    <section className="bg-white">
      <div className="huntContainer section-padding flex flex-col gap-12">
        <div className="flexBetween gap-4">
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-3xl lg:text-4xl tracking-tight font-bold leading-[1.2]">
              {title ? title : " Meet the hiring companies"}
            </h2>
            <p className="text-gray-500 font-bold text-lg">
              Vestibulum finibus mollis risus quis posuere. Etiam ac tempus
              arcu.
            </p>
          </div>
          <button className="w-fit hover:bg-gray-900 transition text-white bg-blue-700 px-3 py-2 text-sm md:px-8 md:py-4 flexCenter gap-2 font-semibold rounded-md">
            See all companies
          </button>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10">
          <CompanyCard />
        </div>
      </div>
    </section>
  );
};

export default Companies;
