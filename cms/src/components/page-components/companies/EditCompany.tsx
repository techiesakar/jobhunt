import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import axios from "@/hoc/axios";

import {
  TechnologyType,
  LocationType,
  BenefitType,
  CategoryType,
} from "@/types/Types";

import { CompanyFieldData } from "@/components/page-components/companies/CompanyFieldData";

// Context Imports
import { useTechnologyContext } from "@/hoc/context/TechnologyContextProvider";
import { useLocationContext } from "@/hoc/context/LocationContextAPI";
import { useBenefitContext } from "@/hoc/context/BenefitContextProvider";
import { useCategoryContext } from "@/hoc/context/CategoryContextProvider";

// Components Imports
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import MultiSelect from "@/components/ui/MultiSelect";
import UploadImage from "@/components/ui/UploadImage";
import { useCompanyContext } from "@/hoc/context/CompanyContextProvider";
import { ReloadIcon } from "@radix-ui/react-icons";

type PropsType = {
  currentCompany: any;
  setCurrentCompany: any;
  selectedTechnology: TechnologyType[];
  setSelectedTechnology: any;
  selectedLocation: LocationType[];
  setSelectedLocation: any;
  selectedBenefit: BenefitType[];
  setSelectedBenefit: any;
  selectedCategory: CategoryType[];
  setSelectedCategory: any;
};
const EditCompany = ({
  currentCompany,
  setCurrentCompany,
  selectedBenefit,
  setSelectedBenefit,
  selectedCategory,
  setSelectedCategory,
  selectedTechnology,
  setSelectedTechnology,
  selectedLocation,
  setSelectedLocation,
}: PropsType) => {
  const { loading, setLoading, setChange, change } = useCompanyContext();

  const postRequest = (formData: any, resetForm: () => void) => {
    try {
      axios
        .patch("company", formData)
        .then((res) => {
          if (res.status === 200) {
            setCurrentCompany("");
            resetForm();
            setSelectedLocation([]);
            setSelectedBenefit([]);
            setSelectedTechnology([]);
            setSelectedCategory([]);
            setChange(!change);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const { allTechnologies } = useTechnologyContext();
  const { allLocations } = useLocationContext();
  const { allBenefits } = useBenefitContext();
  const { allCategories } = useCategoryContext();

  useEffect(() => {
    console.log(currentCompany);
  });

  return (
    <Formik
      initialValues={{
        id: currentCompany?.id || "",
        company_name: currentCompany?.company_name || "",
        ceo_name: currentCompany?.ceo_name || "",
        agent_name: currentCompany?.agent_name || "",
        company_phone: currentCompany?.company_phone || "",
        company_email: currentCompany?.company_email || "",
        date_founded: currentCompany?.date_founded || "",
        total_employee: currentCompany?.total_employee || "",
        company_benefits: currentCompany?.benefits || [],
        company_categories: currentCompany?.categories || [],
        company_technologies: currentCompany?.technologies || [],
        description: currentCompany?.description || "",
        company_locations: currentCompany?.locations || [],
        image: currentCompany?.image || [],

        facebook: currentCompany.social_links[0].facebook || "",
        instagram: currentCompany.social_links[0].instagram || "",
        youtube: currentCompany.social_links[0].youtube || "",
        twitter: currentCompany.social_links[0].twitter || "",
        tiktok: currentCompany.social_links[0].tiktok || "",
        linkedin: currentCompany.social_links[0].linkedin || "",
        github: currentCompany.social_links[0].github || "",
        pinterest: currentCompany.social_links[0].pinterest || "",
        thread: currentCompany.social_links[0].thread || "",
      }}
      onSubmit={(values: any, { resetForm }) => {
        selectedLocation.map((location) => {
          values.company_locations.push(location.id);
        });
        selectedBenefit.map((benefit) => {
          values.company_benefits.push(benefit.id);
        });
        selectedTechnology.map((technology) => {
          values.company_technologies.push(technology.id);
        });
        selectedCategory.map((category) => {
          values.company_categories.push(category.id);
        });

        try {
          const formData = new FormData();
          formData.append("image", values.image);
          formData.append("company_name", values.company_name);
          formData.append("ceo_name", values.ceo_name);
          formData.append("agent_name", values.agent_name);
          formData.append("company_phone", values.company_phone);
          formData.append("company_email", values.company_email);
          formData.append("date_founded", values.date_founded);
          formData.append("total_employee", values.total_employee);
          formData.append("description", values.description);

          // Append the JSON strings to FormData
          formData.append(
            "company_locations",
            JSON.stringify(values.company_locations)
          );
          formData.append(
            "company_benefits",
            JSON.stringify(values.company_benefits)
          );
          formData.append(
            "company_technologies",
            JSON.stringify(values.company_technologies)
          );
          formData.append(
            "company_categories",
            JSON.stringify(values.company_categories)
          );
          const socialLinks = [
            {
              facebook: values.facebook,
              instagram: values.instagram,
              youtube: values.youtube,
              twitter: values.twitter,
              tiktok: values.tiktok,
              linkedin: values.linkedin,
              github: values.github,
              pinterest: values.pinterest,
              thread: values.thread,
            },
          ];
          console.log(socialLinks, 131);
          console.log(JSON.stringify(socialLinks), 145);
          formData.append("social_links", JSON.stringify(socialLinks));

          console.log(values.social_links, 148);

          postRequest(formData, resetForm);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ setFieldValue, handleSubmit, handleChange, values }) => (
        <Form key={1} className="text-sm" onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 col-span-12 gap-4 border-gray-200">
            {CompanyFieldData.map((val: any) => {
              if (val.type === "field" && val.variant !== "social_link") {
                return (
                  <div
                    key={val.apikey}
                    className="flex flex-col col-span-3 space-y-2"
                  >
                    <span>{val.label}</span>
                    <Field
                      name={val.apikey}
                      placeholder={val.label}
                      className="col-span-3 px-3 py-2 border border-gray-300 rounded-md outline-none"
                    />
                    <ErrorMessage name={val.apikey} />
                  </div>
                );
              }

              if (val.type === "date") {
                return (
                  <div
                    key={val.apikey}
                    className="flex flex-col col-span-3 space-y-2"
                  >
                    <span>{val.label}</span>
                    <Field
                      name={val.apikey}
                      type={val.type}
                      placeholder="Founded Date"
                      className="col-span-3 px-3 py-2 border border-gray-300 rounded-md outline-none"
                    />
                  </div>
                );
              }
              if (
                val.type === "multiselect" &&
                val.apikey === "company_location"
              ) {
                return (
                  <div
                    key={val.apikey}
                    className="flex flex-col col-span-6 space-y-2"
                  >
                    <span>{val.label}</span>
                    <MultiSelect
                      title="Select Benefits"
                      selectedOption={selectedLocation}
                      setSelectedOption={setSelectedLocation}
                      allOptions={allLocations}
                    />
                  </div>
                );
              }
              if (
                val.type === "multiselect" &&
                val.apikey === "company_benefits"
              ) {
                return (
                  <div
                    key={val.apikey}
                    className="flex flex-col col-span-6 space-y-2"
                  >
                    <span>{val.label}</span>

                    <MultiSelect
                      title="Select Benefits"
                      selectedOption={selectedBenefit}
                      setSelectedOption={setSelectedBenefit}
                      allOptions={allBenefits}
                    />
                  </div>
                );
              }
              if (
                val.type === "multiselect" &&
                val.apikey === "company_technologies"
              ) {
                return (
                  <div
                    key={val.apikey}
                    className="flex flex-col col-span-6 space-y-2"
                  >
                    <span>{val.label}</span>

                    <MultiSelect
                      title="Select Technology"
                      selectedOption={selectedTechnology}
                      setSelectedOption={setSelectedTechnology}
                      allOptions={allTechnologies}
                    />
                  </div>
                );
              }
              if (
                val.type === "multiselect" &&
                val.apikey === "company_categories"
              ) {
                return (
                  <div
                    key={val.apikey}
                    className="flex flex-col col-span-6 space-y-2"
                  >
                    <span>{val.label}</span>

                    <MultiSelect
                      title="Select Category"
                      selectedOption={selectedCategory}
                      setSelectedOption={setSelectedCategory}
                      allOptions={allCategories}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="grid grid-cols-12 col-span-12 gap-4 pt-4 border-t border-gray-200">
            <h2 className="col-span-12 text-lg font-semibold text-blue-700">
              Social Profile
            </h2>
            {CompanyFieldData.map((val: any) => {
              if (val.type === "field" && val.variant === "social_link") {
                return (
                  <div
                    key={val.apikey}
                    className="flex flex-col col-span-3 space-y-2"
                  >
                    <span>{val.label}</span>
                    <Field
                      name={val.apikey}
                      placeholder={val.label}
                      className="col-span-3 px-3 py-2 border border-gray-300 rounded-md outline-none"
                    />
                    <ErrorMessage name={val.apikey} />
                  </div>
                );
              }
            })}
          </div>

          <div className="grid grid-cols-12 col-span-12 gap-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col col-span-12 gap-4">
              <h2 className="col-span-12 text-lg font-semibold text-blue-700">
                Company Description
              </h2>
              <ReactQuill
                theme="snow"
                value={values.description}
                className="w-full min-h-[240px] h-full"
                onChange={(e) => {
                  setFieldValue("description", e);
                }}
              />
            </div>
            <div className="col-span-4 mt-10">
              <UploadImage
                values={values}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                label="Upload Company Logo"
                name="image"
              />
            </div>

            <div className="col-span-12 mr-auto mt-14 mb-14">
              {loading ? (
                <Button disabled>
                  <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit">Update</Button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditCompany;
