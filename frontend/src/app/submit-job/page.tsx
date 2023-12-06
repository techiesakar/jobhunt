import JobPostFormik from "@/components/page-components/submit-job/JobPostFormik";
import BenefitContextProvider from "@/hoc/context/BenefitContextProvider";
import CategoryContextProvider from "@/hoc/context/CategoryContextProvider";
import CompanyContextProvider from "@/hoc/context/CompanyContextProvider";
import JobContextProvider from "@/hoc/context/JobContextProvider";
import JobtypeContextProvider from "@/hoc/context/JobTypeContextProvider";
import LocationContextProvider from "@/hoc/context/LocationContextProvider";
import SkillContextProvider from "@/hoc/context/SkillContextProvider";
import TechnologyContextProvider from "@/hoc/context/TechnologyContextProvider";
import React from "react";

const SubmitJob = () => {
  return (
    <CompanyContextProvider>
      <JobContextProvider>
        <CategoryContextProvider>
          <LocationContextProvider>
            <TechnologyContextProvider>
              <SkillContextProvider>
                <JobtypeContextProvider>
                  <BenefitContextProvider>
                    <div className="flex flex-col pt-10">
                      <section className="gap-8 py-10 bg-gray-100 lg:gap-12">
                        <div className="flex flex-col gap-6 huntContainer">
                          <div className="flex flex-col gap-4 md:gap-6">
                            <h1 className="text-2xl font-medium">
                              New job listing
                            </h1>
                          </div>
                          <JobPostFormik />
                        </div>
                      </section>
                    </div>
                  </BenefitContextProvider>
                </JobtypeContextProvider>
              </SkillContextProvider>
            </TechnologyContextProvider>
          </LocationContextProvider>
        </CategoryContextProvider>
      </JobContextProvider>
    </CompanyContextProvider>
  );
};

export default SubmitJob;
