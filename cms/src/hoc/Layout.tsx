import Sidebar from "@/components/navigation/sidebar/Sidebar";
import Toolbar from "@/components/navigation/toolbar/Toolbar";
import React, { useEffect, useState } from "react";
import { useMenuContext } from "./context/MenuContextProvider";
import { Outlet } from "react-router-dom";
import SkillContextProvider from "./context/SkillContextProvider";
import CategoryContextProvider from "./context/CategoryContextProvider";
import CompanyContextProvider from "./context/CompanyContextProvider";
import JobContextProvider from "./context/JobContextProvider";
import LocationContextProvider from "./context/LocationContextAPI";
import BenefitContextProvider from "./context/BenefitContextProvider";
import TechnologyContextProvider from "./context/TechnologyContextProvider";

const Layout = () => {
  const { menuToggle } = useMenuContext();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SkillContextProvider>
      <CategoryContextProvider>
        <CompanyContextProvider>
          <JobContextProvider>
            <LocationContextProvider>
              <BenefitContextProvider>
                <TechnologyContextProvider>
                  <div className="relative ">
                    <div
                      className={`site-main transition-all ease-in-out bg-gray-50 ${
                        screenWidth <= 1024
                          ? menuToggle
                            ? "pl-sidebarWidth"
                            : ""
                          : menuToggle
                          ? ""
                          : "lg:pl-sidebarWidth"
                      }`}
                    >
                      <div className="flex flex-col justify-between min-h-screen ">
                        <Toolbar />
                        <main className="flex-1 pl-10 pr-8 md:pt-12">
                          <Outlet />
                        </main>
                        {/* <Footer /> */}
                      </div>
                    </div>
                    <Sidebar />
                  </div>
                </TechnologyContextProvider>
              </BenefitContextProvider>
            </LocationContextProvider>
          </JobContextProvider>
        </CompanyContextProvider>
      </CategoryContextProvider>
    </SkillContextProvider>
  );
};

export default Layout;
