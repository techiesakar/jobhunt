import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import axios from "@/hoc/axios";
import { CategoryType } from "@/types/Types";
import { format } from "date-fns";

import { DateRange } from "react-day-picker";

type ContextType = {
  allCategories: CategoryType[];

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  change: boolean;

  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<string>>;

  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

export const CategoryContext = createContext<ContextType>({} as ContextType);

export default function CategoryContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Change is used to update Table without reloading using useMemo

  // Get all the categories lists
  const [allCategories, setAllCategories] = useState<CategoryType[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [order, setOrder] = useState<string>("asc");

  const [date, setDate] = React.useState<DateRange | undefined>();

  // Change is used to update Table without reloading using useMemo
  const [change, setChange] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // Get Request
  const getTable = useCallback(() => {
    try {
      if (date?.from && date?.to) {
        axios
          .get(
            `/category?search=${search}&&sort=${order}&&startDate=${format(
              date.from,
              "yyyy-MM-dd"
            )}&&endDate=${format(date.to, "yyyy-MM-dd")}`
          )
          .then((res) => {
            setAllCategories([...res.data.result]);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get(`/category?search=${search}&&sort=${order}`)
          .then((res) => {
            setAllCategories([...res.data.result]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [search, order, date?.from, date?.to]);

  // useMemo get called when changes occur - it happens under Post, Delete and Patch Requests
  useMemo(() => {
    getTable();
  }, [change, search, order, date?.from, date?.to]);

  return (
    <CategoryContext.Provider
      value={{
        allCategories,
        setLoading,
        setChange,
        loading,
        change,
        setSearch,
        setOrder,
        date,
        setDate,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryContextProvider"
    );
  }
  return context;
}
