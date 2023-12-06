"use client";
import React, { useEffect, useState } from "react";
import axios from "@/hoc/axios";
import { format } from "date-fns";

// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useCompanyContext } from "@/hoc/context/CompanyContextProvider";
import { useTechnologyContext } from "@/hoc/context/TechnologyContextProvider";
import { useLocationContext } from "@/hoc/context/LocationContextProvider";

import { useSkillContext } from "@/hoc/context/SkillContextProvider";
import { useCategoryContext } from "@/hoc/context/CategoryContextProvider";
import { useJobtypeContext } from "@/hoc/context/JobTypeContextProvider";
import {
  BenefitType,
  CategoryType,
  JobTypeType,
  LocationType,
  SkillType,
  TechnologyType,
} from "@/types/Types";
import { Field, Form, Formik } from "formik";

import MultiSelect from "@/components/ui/MultiSelect";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import UploadImage from "@/components/ui/UploadImage";
import { useBenefitContext } from "@/hoc/context/BenefitContextProvider";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const JobPostFormik = () => {
  const { allTechnologies } = useTechnologyContext();
  const { allLocations } = useLocationContext();
  const { allBenefits } = useBenefitContext();

  const { allSkills } = useSkillContext();
  const { allCategories } = useCategoryContext();
  const { allJobtypes } = useJobtypeContext();
  // useStates
  const [selectedJobType, setSelectedJobType] = useState<JobTypeType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<SkillType[]>([]);
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationType[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<
    TechnologyType[]
  >([]);

  const [date, setDate] = React.useState<Date>();
  if (date) {
    console.log(format(date, "yyyy-MM-dd"));
  }

  const CompanyFieldData = [
    {
      label: "Job Title",
      type: "field",
      apikey: "name",
      className: "order-1",
    },

    {
      label: "Job Types",
      type: "multiselect",
      selectedOption: selectedJobType,
      setSelectedOption: setSelectedJobType,
      allOptions: allJobtypes,
      apikey: "job_types",
      className: "order-5",
    },
    {
      label: "Categories",
      type: "multiselect",
      apikey: "job_categories",
      selectedOption: selectedCategory,
      setSelectedOption: setSelectedCategory,
      allOptions: allCategories,
      className: "order-6",
    },
    {
      label: "Skills",
      type: "multiselect",
      apikey: "job_skills",
      selectedOption: selectedSkill,
      setSelectedOption: setSelectedSkill,
      allOptions: allSkills,
      className: "order-7",
    },
    {
      label: "Technologies",
      type: "multiselect",
      apikey: "job_technologies",
      selectedOption: selectedTechnology,
      setSelectedOption: setSelectedTechnology,
      allOptions: allTechnologies,
      className: "order-8",
    },
    {
      label: "Benefits",
      type: "multiselect",
      apikey: "job_benefits",
      selectedOption: selectedBenefit,
      setSelectedOption: setSelectedBenefit,
      allOptions: allBenefits,
      className: "order-9",
    },

    {
      label: "Location",
      type: "multiselect",
      apikey: "job_locations",
      selectedOption: selectedLocation,
      setSelectedOption: setSelectedLocation,
      allOptions: allLocations,
      className: "order-10",
    },

    {
      label: "Role",
      type: "field",
      apikey: "job_role",
      className: "order-9",
    },
    {
      label: "Salary",
      type: "field",
      apikey: "job_salary",
      desc: "(eg: 45000)",
      className: "order-11",
    },
    {
      label: "Experience",
      type: "field",
      apikey: "job_experience",
      desc: "(e.g: 1-3 years) or (1-12 Months)",
      className: "order-12",
    },

    {
      label: "Job Description",
      type: "richtext",
      apikey: "job_desc",

      className: "order-12",
    },

    {
      label: "Vacancy Deadline",
      type: "date",
      apikey: "vacancy_deadline",
      className: "order-12",
    },
    {
      label: "Upload Image",
      type: "image",
      apikey: "job_image",
      className: "order-12",
    },
  ];

  const postRequest = (formData: any, resetForm: () => void) => {
    try {
      axios
        .post("job/submit-job", formData, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("data added");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        job_phone: "",
        job_email: "",
        job_role: "",
        job_types: [],
        job_categories: [],
        job_skills: [],
        job_technologies: [],
        job_benefits: [],
        job_locations: [],
        job_salary: "",
        job_experience: "",
        job_desc: "",
        who_to_apply: "",
        vacancy_deadline: "",
        job_image: [],
      }}
      onSubmit={(values: any, { resetForm }) => {
        selectedJobType.map((val) => {
          values.job_types.push(val.id);
        });
        selectedCategory.map((val) => {
          values.job_categories.push(val.id);
        });
        selectedSkill.map((val) => {
          values.job_skills.push(val.id);
        });
        selectedTechnology.map((val) => {
          values.job_technologies.push(val.id);
        });
        selectedBenefit.map((val) => {
          values.job_benefits.push(val.id);
        });
        selectedLocation.map((val) => {
          values.job_locations.push(val.id);
        });
        if (date) {
          values.vacancy_deadline = format(date, "yyyy-MM-dd");
        } else {
          values.vacancy_deadline = "";
        }

        try {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("job_phone", values.job_phone);
          formData.append("job_email", values.job_email);
          // Append the JSON strings to FormData
          formData.append("job_types", JSON.stringify(values.job_types));
          formData.append(
            "job_categories",
            JSON.stringify(values.job_categories)
          );

          formData.append("job_skills", JSON.stringify(values.job_skills));

          formData.append(
            "job_technologies",
            JSON.stringify(values.job_technologies)
          );

          formData.append("job_benefits", JSON.stringify(values.job_benefits));

          formData.append(
            "job_locations",
            JSON.stringify(values.job_locations)
          );
          formData.append("job_role", values.job_role);
          formData.append("job_salary", values.job_salary);
          formData.append("job_desc", values.job_desc);
          formData.append("who_to_apply", values.who_to_apply);

          formData.append("vacancy_deadline", values.vacancy_deadline);

          formData.append("job_image", values.job_image);
          console.log(values);
          postRequest(formData, resetForm);
        } catch (error) {
          console.log("error");
        }
      }}
    >
      {({ values, handleSubmit, setFieldValue, handleChange }) => {
        return (
          <div>
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 p-6 bg-white rounded-md shadow md:p-8"
            >
              <div className="grid grid-cols-12 gap-6 ">
                {CompanyFieldData.map((item, index) => {
                  if (item.type === "field") {
                    return (
                      <div
                        key={index}
                        className={`flex flex-col col-span-3 justify-between  gap-2  ${item.className}`}
                      >
                        <div className="left">
                          <div className="text-sm">
                            {item.label} <span className="text-red-600">*</span>
                          </div>
                          {item?.desc && (
                            <div className="text-xs italic text-gray-400">
                              {item.desc}
                            </div>
                          )}
                        </div>
                        <div className="w-full right">
                          <Field
                            type="text"
                            name={item.apikey}
                            placeholder=""
                            className="w-full p-2 transition-all duration-300 border border-gray-200 rounded-md outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    );
                  }

                  if (item.type === "multiselect") {
                    return (
                      <div
                        key={index}
                        className={`flex col-span-6 flex-col justify-between w-full gap-2  ${item.className}`}
                      >
                        <div className="left">
                          <div className="text-sm">
                            {item.label} <span className="text-red-600">*</span>
                          </div>
                          <div className="text-xs italic text-gray-400">
                            {item.desc}
                          </div>
                        </div>
                        <div className="w-full right ">
                          <MultiSelect
                            title="Select Types"
                            selectedOption={item.selectedOption}
                            setSelectedOption={item.setSelectedOption}
                            allOptions={item.allOptions}
                          ></MultiSelect>
                        </div>
                      </div>
                    );
                  }
                  if (item.type === "richtext") {
                    return (
                      <div
                        key={index}
                        className={`flex flex-col col-span-12 justify-between w-full gap-2 mb-10  ${item.className}`}
                      >
                        <div className="left">
                          <div className="text-sm">
                            {item.label} <span className="text-red-600">*</span>
                          </div>
                          <div className="text-xs italic text-gray-400">
                            {item.desc}
                          </div>
                        </div>
                        <div className="w-full right ">
                          <ReactQuill
                            theme="snow"
                            value={values[`${item.apikey}`]}
                            className="w-full h-60 "
                            onChange={(e) => {
                              setFieldValue(`${item.apikey}`, e);
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                  if (item.apikey === "vacancy_deadline") {
                    return (
                      <div
                        key={index}
                        className={`flex flex-col col-span-12  w-full gap-2  ${item.className}`}
                      >
                        <div className="left">
                          <div className="text-sm">
                            {item.label} <span className="text-red-600">*</span>
                          </div>
                          <div className="text-xs italic text-gray-400">
                            {item.desc}
                          </div>
                        </div>
                        <div className="w-full right lg:w-8/12 ">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="w-4 h-4 mr-2" />
                                {date ? (
                                  format(date, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    );
                  }
                  if (item.apikey === "job_image") {
                    return (
                      <div
                        key={index}
                        className={`flex flex-col col-span-4 justify-between w-full gap-2  ${item.className}`}
                      >
                        <div className="left">
                          <div className="text-sm">
                            {item.label} <span className="text-red-600">*</span>
                          </div>
                          <div className="text-xs italic text-gray-400">
                            {item.desc}
                          </div>
                        </div>
                        <div className="w-full right lg:w-8/12 ">
                          <UploadImage
                            values={values}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                            name="job_image"
                          />
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="my-8">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default JobPostFormik;
