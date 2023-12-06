"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "@/hoc/axios";

type PropsType = {
  children: React.ReactNode;
};

type ContextTypes = {
  allCategories: any;
};

export const CategoryContext = createContext<ContextTypes>({} as ContextTypes);

export default function CategoryContextProvider({ children }: PropsType) {
  const [allCategories, setAllCategories] = useState<any>([]);

  const getCategories = () => {
    try {
      axios
        .get("/category")
        .then((res) => {
          setAllCategories([...res.data.result]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        allCategories,
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
