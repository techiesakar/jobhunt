import { SidebarData } from "@/data/SidebarData";
import { useMenuContext } from "@/hoc/context/MenuContextProvider";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [openSubmenu, setOpenSubMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const submenuRef = useRef(null);
  const { menuToggle } = useMenuContext();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submenuRef.current &&
        !(submenuRef.current as any).contains(event.target as Node)
      ) {
        setOpenSubMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <aside
      className={` w-[280px] h-screen  fixed  inset-y-0 transition-all ease-in-out bg-darksidebar flex  flex-col ${
        screenWidth <= 1020
          ? menuToggle
            ? "left-0"
            : "-left-full"
          : menuToggle
          ? "-left-full"
          : "left-0"
      }`}
    >
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="transition duration-100 ease-in-out fill-blue-700 group-hover:fill-white"
          >
            <path
              id="Union_1"
              data-name="Union 1"
              d="M2,16a1,1,0,0,1-1-1V13H15v2a1,1,0,0,1-1,1ZM0,11V5A1,1,0,0,1,1,4H4V1A1,1,0,0,1,5,0h6a1,1,0,0,1,1,1V4h3a1,1,0,0,1,1,1v6ZM10,4V2H6V4Z"
            ></path>
          </svg>
          <span className="flex items-center text-white">
            <span className="text-lg font-semibold">Job</span>
            <span className="font-medium">Hunt</span>
          </span>
        </Link>
      </div>
      <hr className="h-1 border-gray-700" />

      {/* Navigation */}
      <nav className="px-4 py-6">
        <ul className="flex flex-col gap-1 p-0 m-0 list-none ">
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className="relative">
                {item.children && item.children.length > 0 ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event propagation
                      setOpenSubMenu(!openSubmenu);
                      setActiveMenu(item.title);
                    }}
                    className={`relative transition-all  font-bold duration-200 ease-in-out flex flex-wrap items-center justify-between py-2 px-4 text-left w-full hover:bg-gray-700/40 rounded-2xl text-gray-400 hover:text-gray-50  ${
                      location.pathname === item.link &&
                      "text-gray-50 bg-gray-700/40"
                    }`}
                  >
                    {item.title}

                    <IoIosArrowDown />
                    <ul
                      ref={submenuRef}
                      className={`
                      transition-all ease-in-out  ${
                        openSubmenu && item.title === activeMenu
                          ? "max-h-[400px] mt-3  duration-300"
                          : "max-h-0 overflow-hidden mt-0 opacity-0 duration-100"
                      } flex flex-col w-full gap-1  list-none `}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.children.map((subItem: any) => (
                        <li
                          key={subItem.title}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Link
                            to={subItem.link}
                            className="flex items-center justify-start w-full px-4 py-2 text-sm font-bold text-left text-gray-400 transition-all duration-200 ease-in-out hover:bg-gray-700/40 rounded-2xl hover:text-gray-50"
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </button>
                ) : (
                  <Link
                    to={item.link}
                    className={`relative transition-all  font-bold duration-200 ease-in-out flex items-center justify-between py-2 px-4 text-left w-full hover:bg-gray-700/40 rounded-2xl text-gray-400 hover:text-gray-50  ${
                      location.pathname === item.link &&
                      "text-gray-50 bg-gray-700/40"
                    }`}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <hr className="h-1 border-gray-700" />
    </aside>
  );
};

export default Sidebar;
