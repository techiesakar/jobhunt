import AddCategory from "@/components/page-components/categories/AddCategory";
import CategoryTable from "@/components/page-components/categories/CategoryTable";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCategoryContext } from "@/hoc/context/CategoryContextProvider";
import DatePickerWithRange from "@/components/ui/DatePickerWithRange";
const Categories = () => {
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const { setSearch, setOrder, date, setDate } = useCategoryContext();
  return (
    <div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex justify-between w-full">
            <h1 className="hunt-h1">Categories</h1>
            <div className="flex items-center gap-4">
              <div>
                <DatePickerWithRange date={date} setDate={setDate} />
              </div>
              <input
                type="text"
                className="p-2 w-[240px] border border-gray-200 outline-none rounded-lg"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
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
        <CategoryTable />
        {openAddForm && <AddCategory setOpenAddForm={setOpenAddForm} />}
      </div>
    </div>
  );
};

export default Categories;
