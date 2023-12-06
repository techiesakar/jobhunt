"use client";
import Cookies from "js-cookie"; // Import the Cookies library
import axios from "@/hoc/axios";

import React, { createContext, useState, useContext, useEffect } from "react";
type PropsType = {
  children: React.ReactNode;
};

type ContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  change: boolean;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginStatusContext = createContext<ContextType | undefined>(
  undefined
);

export default function LoginStatusProvider({ children }: PropsType) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const fetchData = async () => {
          const res = await axios.get("/auth/verifytoken", {
            withCredentials: true,
          });
          if (res.status === 200) {
            setIsLoggedIn(true);
          }
        };
        fetchData();
      } catch (error) {
        console.log("Not logged in");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [change]);
  return (
    <LoginStatusContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        change,
        setChange,
      }}
    >
      {children}
    </LoginStatusContext.Provider>
  );
}

export const useLoginStatusContext = () => {
  const context = useContext(LoginStatusContext);
  if (!context) {
    throw new Error(
      "useLoginStatusContext must be used within a LoginStatusProvider"
    );
  }
  return context;
};
