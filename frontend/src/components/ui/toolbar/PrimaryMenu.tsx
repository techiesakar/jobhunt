import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { NavLinks } from "@/data/navData";
import { useCompanyContext } from "@/hoc/context/CompanyContextProvider";
import { useJobContext } from "@/hoc/context/JobContextProvider";

const PrimaryMenu = () => {
  return (
    <ul className="hidden gap-4 md:flex">
      <li>
        <Link
          className="font-medium text-gray-600 transition-all hover:text-indigo-500"
          href={"/jobs"}
        >
          Jobs
        </Link>
      </li>
      <li>
        <Link
          className="font-medium text-gray-600 transition-all hover:text-indigo-500"
          href={"/companies"}
        >
          Companies
        </Link>
      </li>
    </ul>
  );
};

export default PrimaryMenu;
