import React from "react";
import EmployeeCard from "./EmployeeCard";

const EmployeeSeek = () => {
  return (
    <section className="bg-gray-100 section-padding">
      <div className="flex flex-col huntContainer gap-14">
        <div className="flex flex-col gap-6">
          <h2 className="huntSubHead">Looking for employees?</h2>
          <p className="huntPara">
            Discover a pool of talented candidates waiting to join your team.
            Find the perfect fit for your company with JobHunt's recruitment
            solutions.
          </p>
        </div>
        {/* Top Section Ends */}

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 ">
          <EmployeeCard className="line-clamp-2" />
        </div>
      </div>
    </section>
  );
};

export default EmployeeSeek;
