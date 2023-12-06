import { BiSolidBell } from "react-icons/bi";
import Cookies from "js-cookie"; // Import js-cookie

// Shadcn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineMenu } from "react-icons/ai";
import { useMenuContext } from "@/hoc/context/MenuContextProvider";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PasswordForm from "./PasswordForm";

const Toolbar = () => {
  const { menuToggle, setMenuToggle } = useMenuContext();
  const navigate = useNavigate();
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);

  return (
    <header className="pr-10 lg:pr-20">
      <div className="flex items-center justify-between h-16 bg-gray-100 rounded-lg shadow-sm ">
        <div className="flex items-center h-full left">
          <div className="flex items-center h-full ">
            <button
              type="button"
              onClick={() => setMenuToggle(!menuToggle)}
              className="p-3 text-xl transition-all duration-300 ease-in-out rounded-full hover:text-gray-600"
            >
              <AiOutlineMenu />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 right">
          <button
            type="button"
            className="relative p-3 text-xl text-gray-600 transition-all duration-300 ease-in-out rounded-full hover:bg-slate-100"
          >
            <BiSolidBell />
            <span className="absolute inline-block w-2 h-2 bg-green-500 rounded-full top-1 right-2"></span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User Name"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenChangePassword(true)}>
                Change Password
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("token");
                    Cookies.remove("token");

                    navigate("/signin");
                  }}
                >
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {openChangePassword && (
          <PasswordForm setOpenChangePassword={setOpenChangePassword} />
        )}
      </div>
    </header>
  );
};

export default Toolbar;
