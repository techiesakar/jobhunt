"use client";
import Cookies from "js-cookie"; // Import the Cookies library

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
    let token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      console.log("Token unavailable");
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
