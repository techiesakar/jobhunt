import AddTechnology from "@/components/page-components/technologies/AddTechnology";
import TechnologyTable from "@/components/page-components/technologies/TechnologyTable";
import { Button } from "@/components/ui/button";
import TechnologyContextAPI from "@/hoc/context/TechnologyContextProvider";
import { useState } from "react";

const Technologies = () => {
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);

  return (
    <TechnologyContextAPI>
      <div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex justify-between items-center w-full">
            <h1 className="hunt-h1">Technology</h1>

            <Button
              type="button"
              onClick={() => setOpenAddForm(!openAddForm)}
              className="bg-blue-700 flex items-center transition-all duration-300 justify-between"
            >
              + Add
            </Button>
          </div>
          <TechnologyTable />
          {openAddForm && <AddTechnology setOpenAddForm={setOpenAddForm} />}
        </div>
      </div>
    </TechnologyContextAPI>
  );
};

export default Technologies;
