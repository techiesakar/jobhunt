import AddJobForm from "@/components/page-components/jobs/AddJobForm";
import BenefitContextProvider from "@/hoc/context/BenefitContextProvider";
import CategoryContextProvider from "@/hoc/context/CategoryContextProvider";
import CompanyContextProvider from "@/hoc/context/CompanyContextProvider";
import JobTypeContextProvider from "@/hoc/context/JobTypeContextProvider";
import LocationContextProvider from "@/hoc/context/LocationContextAPI";
import SkillContextProvider from "@/hoc/context/SkillContextProvider";
import TechnologyContextProvider from "@/hoc/context/TechnologyContextProvider";

const AddJob = () => {
  return (
    <CompanyContextProvider>
      <SkillContextProvider>
        <JobTypeContextProvider>
          <CategoryContextProvider>
            <BenefitContextProvider>
              <LocationContextProvider>
                <TechnologyContextProvider>
                  <div className="w-full border-gray-300 ">
                    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                      <div className="flex items-center justify-between">
                        <h2 className="mb-6 text-lg font-semibold leading-none tracking-tight text-blue-700">
                          Add Jobs
                        </h2>
                      </div>
                    </div>
                    <AddJobForm />
                  </div>
                </TechnologyContextProvider>
              </LocationContextProvider>
            </BenefitContextProvider>
          </CategoryContextProvider>
        </JobTypeContextProvider>
      </SkillContextProvider>
    </CompanyContextProvider>
  );
};

export default AddJob;
