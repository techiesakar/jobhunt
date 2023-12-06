import React from "react";

const CategoryCard = ({ category }: any) => {
  return (
    <div className="h-[200px] flex flex-col items-center justify-between gap-3 p-8 bg-white  rounded-2xl  border-2 border-gray-200">
      <img
        className="object-cover w-12 h-12"
        src={`http://localhost:4002/public/${category.image}`}
        alt=""
      />
      <h2 className="font-medium text-center text-gray-500 uppercase ">
        {category.name}
      </h2>
    </div>
  );
};

export default CategoryCard;
