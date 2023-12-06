import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

const MultiSelect = ({
  title,
  selectedOption,
  setSelectedOption,
  allOptions,
}: any) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    console.log(selectedOption);
  });

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        (dropdownRef.current as HTMLDivElement).contains(event.target as Node)
      ) {
        return;
      }

      setOpenOptions(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const [openOptions, setOpenOptions] = useState(false);

  const handleRemoveOption = (indexToRemove: number) => {
    const updatedOptions = [...selectedOption];
    updatedOptions.splice(indexToRemove, 1);
    setSelectedOption(updatedOptions);
  };
  return (
    <div
      className="relative w-full"
      onClick={() => setOpenOptions(!openOptions)}
      ref={dropdownRef as React.RefObject<HTMLDivElement>}
    >
      <div className="rounded-md text-sm cursor-pointer w-full grid grid-cols-12  bg-white  min-h-[42px] p-2 h-auto select-wrapper border border-gray-300 items-center gap-2 flex-wrap">
        <div className="flex flex-wrap col-span-10 gap-2 ">
          {selectedOption.map((item: any, index: number) => (
            <button
              type="button"
              key={index}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between gap-2 px-2 py-1 text-xs border border-gray-200 rounded-md"
            >
              <span>{item.name}</span>
              <span
                className="text-gray-800 hover:text-red-600"
                onClick={() => {
                  handleRemoveOption(index);
                }}
              >
                <AiOutlineClose />
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end h-full col-span-2 gap-2">
          <button
            type="button"
            onClick={(e) => {
              setSelectedOption([]);
              setOpenOptions(false);
              e.stopPropagation();
            }}
          >
            {selectedOption.length !== 0 && <AiOutlineClose />}
          </button>
          {selectedOption.length !== allOptions.length && <IoIosArrowDown />}
        </div>
      </div>

      {openOptions && selectedOption.length !== allOptions.length && (
        <ul className="bg-white px-2 py-1 rounded-md absolute text-sm  top-[calc(100%+6px)] border z-50  border-gray-200 w-full transition-all ease-in-out duration-300 ">
          <li className="px-2 py-1 text-gray-400 transition-all ease-in rounded-md cursor-pointer pointer-events-none hover:bg-gray-100">
            Select Option
          </li>

          {allOptions.map((item: any) => {
            const isSelected = selectedOption.some(
              (option: any) => option.id === item.id
            );

            return (
              <li
                onClick={() => {
                  setSelectedOption((prev: any) => [
                    ...prev,
                    { id: item.id, name: item.name },
                  ]);
                }}
                key={item.id}
                className={` rounded-md hover:bg-gray-100 cursor-pointer px-2 py-1 transition-all  ease-in ${
                  isSelected && "hidden"
                }`}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      )}

      {selectedOption.length === 0 && (
        <span className="absolute text-sm -translate-y-1/2 cursor-pointer top-1/2 left-4">
          {title}
        </span>
      )}
    </div>
  );
};

export default MultiSelect;
