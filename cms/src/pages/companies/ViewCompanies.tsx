import CompanyTable from "@/components/page-components/companies/CompanyTable";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

const ViewCompanies = () => {
  return (
    <div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex items-center justify-between w-full">
          <h1 className="hunt-h1">Companies</h1>
          <Button
            type="button"
            className="flex items-center justify-between transition-all duration-300 bg-blue-700"
          >
            <Link to={"/company/add"}> + Add</Link>
          </Button>
        </div>
        <CompanyTable />
      </div>
    </div>
  );
};

export default ViewCompanies;
