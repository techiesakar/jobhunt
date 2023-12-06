"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "@/hoc/axios";
import { BenefitType } from "@/types/Types";

// This is used to describe the type of Context
type ContextType = {
  allBenefits: BenefitType[];
};

export const BenefitContext = createContext<ContextType>({} as ContextType);

export default function BenefitContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get all the benefits lists
  const [allBenefits, setAllBenefits] = useState<BenefitType[]>([]);

  const getTable = useCallback(() => {
    try {
      axios
        .get("/benefit")
        .then((res) => {
          setAllBenefits([...res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getTable();
  }, []);

  return (
    <BenefitContext.Provider
      value={{
        allBenefits,
      }}
    >
      {children}
    </BenefitContext.Provider>
  );
}

export function useBenefitContext() {
  const context = useContext(BenefitContext);
  if (!context) {
    throw new Error(
      "useBenefitContext must be used within a BenefitContextProvider"
    );
  }
  return context;
}
