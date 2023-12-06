import AddBenefit from "@/components/page-components/benefits/AddBenefit";
import BenefitTable from "@/components/page-components/benefits/BenefitTable";
import { Button } from "@/components/ui/button";
import BenefitContextAPI from "@/hoc/context/BenefitContextProvider";
import { useState } from "react";

const Benefits = () => {
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);

  return (
    <BenefitContextAPI>
      <div>
        <div className="flex flex-col w-full gap-6">
          <div className="flex items-center justify-between w-full">
            <h1 className="hunt-h1">Benefits</h1>
            <Button
              type="button"
              onClick={() => setOpenAddForm(!openAddForm)}
              className="flex items-center justify-between transition-all duration-300 bg-blue-700"
            >
              + Add
            </Button>
          </div>
          <BenefitTable />
          {openAddForm && <AddBenefit setOpenAddForm={setOpenAddForm} />}
        </div>
      </div>
    </BenefitContextAPI>
  );
};

export default Benefits;
