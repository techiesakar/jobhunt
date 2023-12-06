import CreateCompanyForm from "@/components/page-components/create-company/CreateCompanyForm";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col bg-white ">
      <section className="">
        <div className="flex flex-col pt-10 huntContainer">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-semibold">
              Submit Company Application
            </h1>
          </div>

          <CreateCompanyForm />
        </div>
      </section>
    </div>
  );
};

export default page;
