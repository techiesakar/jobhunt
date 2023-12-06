"use client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Formik, Form, Field, ErrorMessage } from "formik";

const FilterSearch = () => {
  const backgroundStyle = {
    backgroundImage: `url("/banner.svg")`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    /* Additional inline styles for positioning and styling */
  };
  return (
    <Formik
      initialValues={{
        keyword: "",
        category: "",
        location: "",
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({}) => {
        return (
          <Form
            style={backgroundStyle}
            className="bg-[#051A49] py-20 section-padding"
          >
            <div className="flex flex-col gap-6 md:gap-10 huntContainer">
              <div className="flex gap-4 px-20">
                <Field
                  type="text"
                  name="keyword"
                  className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500"
                  placeholder="Enter Keywords"
                  required
                />

                <Select>
                  <SelectTrigger className="bg-white ">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="content-writing">
                        Content Writing
                      </SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="information technology">
                        Information Technology
                      </SelectItem>
                      <SelectItem value="teaching">Teaching</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="bg-white ">
                    <SelectValue placeholder="Select a Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Locations</SelectLabel>
                      <SelectItem value="butwal">Butwal</SelectItem>
                      <SelectItem value="nepalgunj">Nepalgunj</SelectItem>
                      <SelectItem value="bhairahawa">Bhairahawa</SelectItem>
                      <SelectItem value="kathmandu">Kathmandu</SelectItem>
                      <SelectItem value="dang">Dang</SelectItem>
                      <SelectItem value="pokhara">Pokhara</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <button className="bg-[#E60278] text-sm font-semibold  px-4 py-2 text-white rounded-md hover:bg-[#e91180] transision-all">
                  HUNT
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FilterSearch;
