import JobTable from "@/components/page-components/jobs/JobTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ViewJobs = () => {
  return (
    <div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="hunt-h1">Jobs</h1>
          <Button
            type="button"
            className="flex items-center justify-between transition-all duration-300 bg-blue-700"
          >
            <Link to={"/job/add"}> + Add</Link>
          </Button>
        </div>
        <JobTable />
      </div>
    </div>
  );
};

export default ViewJobs;
