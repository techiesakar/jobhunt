"use client";
import React from "react";
import axios from "@/hoc/axios";

import { Formik, Form, Field, ErrorMessage } from "formik";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// Shadcn Components
import { Button } from "@/components/ui/button";
import { CompanyFieldData } from "./CompanyFieldData";
import UploadImage from "@/components/ui/UploadImage";

const CreateCompanyForm = () => {
  const postRequest = (formData: any, resetForm: () => void) => {
    try {
      axios
        .post("/company/create-company", formData)
        .then((res) => {
          if (res.status === 200) {
            resetForm();
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
        company_name: "",
        company_phone: "",
        company_email: "",
        company_website: "",
        date_founded: "2023-09-01",
        description: "",
        image: "",
        total_employee: 0,
      }}
      onSubmit={(values, { resetForm }) => {
        try {
          const formData = new FormData();

          formData.append("image", values.image);
          formData.append("company_name", values.company_name);
          formData.append("company_phone", values.company_phone);
          formData.append("company_email", values.company_email);
          formData.append("date_founded", values.date_founded);
          formData.append("description", values.description);
          console.log(values);
          postRequest(formData, resetForm);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ values, handleSubmit, setFieldValue, handleChange }) => {
        console.log(values);
        return (
          <Form key={1} className="mt-10 text-sm " onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 col-span-12 gap-4 border-gray-200">
              {CompanyFieldData.map((val: any) => {
                if (val.type === "field") {
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
                <Button type="submit" name="submit" className="w-32">
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateCompanyForm;
