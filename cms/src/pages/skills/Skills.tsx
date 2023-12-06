import AddSkill from "@/components/page-components/skills/AddSkill";
import SkillTable from "@/components/page-components/skills/SkillTable";
import { Button } from "@/components/ui/button";
import { useSkillContext } from "@/hoc/context/SkillContextProvider";

import { useState } from "react";
import DatePickerWithRange from "@/components/ui/DatePickerWithRange";

const Skills = () => {
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const { setSearch, setOrder, date, setDate } = useSkillContext();
  return (
    <div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex justify-between w-full">
            <h1 className="hunt-h1">Skills</h1>
            <div className="flex items-center gap-4">
              <div>
                <DatePickerWithRange date={date} setDate={setDate} />
              </div>
              <input
                type="text"
                className="p-2 w-[240px] border border-gray-200 outline-none rounded-lg"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
              <div className="hidden">
                <button
                  type="button"
                  onClick={() => setOrder("asc")}
                  className="px-2 py-1 text-black bg-gray-100 border rounded"
                >
                  Ascen
                </button>
                <button
                  type="button"
                  onClick={() => setOrder("desc")}
                  className="px-2 py-1 text-black bg-gray-100 border rounded"
                >
                  Desc
                </button>
              </div>
              <Button
                type="button"
                onClick={() => setOpenAddForm(!openAddForm)}
                className="flex items-center justify-between transition-all duration-300 bg-blue-700"
              >
                + Add
              </Button>
            </div>
          </div>
        </div>
        <SkillTable />
        {openAddForm && <AddSkill setOpenAddForm={setOpenAddForm} />}
      </div>
    </div>
  );
};

export default Skills;
