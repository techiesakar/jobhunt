import AddCompanyForm from "@/components/page-components/companies/AddCompanyForm";
import BenefitContextAPI from "@/hoc/context/BenefitContextProvider";
import CategoryContextAPI from "@/hoc/context/CategoryContextProvider";
import LocationContextAPI from "@/hoc/context/LocationContextAPI";
import TechnologyContextAPI from "@/hoc/context/TechnologyContextProvider";

const AddCompany = () => {
  return (
    <TechnologyContextAPI>
      <LocationContextAPI>
        <BenefitContextAPI>
          <CategoryContextAPI>
            <div className="w-full border-gray-300 ">
              <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-between">
                  <h2 className="mb-6 text-lg font-semibold leading-none tracking-tight text-blue-700">
                    Add Company
                  </h2>
                </div>
              </div>
              <AddCompanyForm />
            </div>
          </CategoryContextAPI>
        </BenefitContextAPI>
      </LocationContextAPI>
    </TechnologyContextAPI>
  );
};

export default AddCompany;
