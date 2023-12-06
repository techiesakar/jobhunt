import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import axios from "@/hoc/axios";
import { SkillType } from "@/types/Types";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

type ContextType = {
  allSkills: SkillType[];

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  change: boolean;

  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<string>>;

  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

export const SkillContext = createContext<ContextType>({} as ContextType);

export default function SkillContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get all the skills lists
  const [allSkills, setAllSkills] = useState<SkillType[]>([]);

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
            `/skill?search=${search}&&sort=${order}&&startDate=${format(
              date.from,
              "yyyy-MM-dd"
            )}&&endDate=${format(date.to, "yyyy-MM-dd")}`
          )
          .then((res) => {
            setAllSkills([...res.data.result]);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get(`/skill?search=${search}&&sort=${order}`)
          .then((res) => {
            setAllSkills([...res.data.result]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [search, order, date?.from, date?.to]);

  useMemo(() => {
    getTable();
  }, [change, search, order, date?.from, date?.to]);

  return (
    <SkillContext.Provider
      value={{
        allSkills,
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
    </SkillContext.Provider>
  );
}

export function useSkillContext() {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error(
      "useSkillContext must be used within a SkillContextProvider"
    );
  }
  return context;
}
