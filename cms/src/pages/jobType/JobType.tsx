import AddJobType from "@/components/page-components/jobType/AddJobType";
import JobTypeTable from "@/components/page-components/jobType/JobTypeTable";
import { Button } from "@/components/ui/button";
import JobTypeContextAPI from "@/hoc/context/JobTypeContextProvider";
import { useState } from "react";

const JobType = () => {
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);

  return (
    <JobTypeContextAPI>
      <div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex justify-between items-center w-full">
            <h1 className="hunt-h1">Job Type</h1>

            <Button
              type="button"
              onClick={() => setOpenAddForm(!openAddForm)}
              className="bg-blue-700 flex items-center transition-all duration-300 justify-between"
            >
              + Add
            </Button>
          </div>
          <JobTypeTable />
          {openAddForm && <AddJobType setOpenAddForm={setOpenAddForm} />}
        </div>
      </div>
    </JobTypeContextAPI>
  );
};

export default JobType;
