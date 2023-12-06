import AddLocation from "@/components/page-components/location/AddLocation";
import LocationTable from "@/components/page-components/location/LocationTable";
import { Button } from "@/components/ui/button";
import LocationContextAPI from "@/hoc/context/LocationContextAPI";
import { useState } from "react";

const Location = () => {
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);

  return (
    <LocationContextAPI>
      <div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex justify-between items-center w-full">
            <h1 className="hunt-h1">Location</h1>
            <Button
              type="button"
              onClick={() => setOpenAddForm(!openAddForm)}
              className="bg-blue-700 flex items-center transition-all duration-300 justify-between"
            >
              + Add
            </Button>
          </div>
          <LocationTable />
          {openAddForm && <AddLocation setOpenAddForm={setOpenAddForm} />}
        </div>
      </div>
    </LocationContextAPI>
  );
};

export default Location;
