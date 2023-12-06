"use client";
import React from "react";
import CategoryCard from "./CategoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { useCategoryContext } from "@/hoc/context/CategoryContextProvider";
const Categories = () => {
  const { allCategories } = useCategoryContext();
  return (
    <section className="bg-white section-padding">
      <div className="flex flex-col gap-6 md:gap-10 huntContainer">
        <div className="w-full">
          <h2 className="text-2xl font-semibold">Explore job categories</h2>
          <p className="mt-4 text-sm">
            These categories provides you the valuable information about a wide
            range of career fields and industries, making it easier for
            individuals to find the perfect job that matches their skills and
            interests.
          </p>
        </div>

        <div className="w-full gap-4">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {allCategories.map((val: any, index: number) => (
              <SwiperSlide key={index}>
                <CategoryCard key={index} category={val} />
              </SwiperSlide>
            ))}

            {allCategories.map(
              (val: any, index: number) =>
                val.image &&
                index < 8 && (
                  <SwiperSlide key={index}>
                    <CategoryCard key={index} category={val} />
                  </SwiperSlide>
                )
            )}
          </Swiper>

          <button className="px-8 py-2 mt-8 text-indigo-600 transition-all border-2 border-indigo-400 rounded-md hover:bg-gray-200 w-fit">
            <Link
              href="/companies"
              className="flex items-center justify-between gap-3"
            >
              <span>See More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
