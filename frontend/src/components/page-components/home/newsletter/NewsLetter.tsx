import React from "react";

const Newsletter = () => {
  return (
    <section className="pb-10 bg-gray-100">
      <div className="p-6 bg-white rounded huntContainer ">
        <div className="flex flex-col items-center justify-center w-full gap-3 md:w-8/12">
          <h2 className="huntSubHead">
            Get notified whenever new and interesting job listings are added.
          </h2>
          <p className="huntPara">
            Stay Informed, Stay Ahead: Subscribe to JobHunt's Newsletter and
            Never Miss Out on Exciting Job Opportunities Again!
          </p>
          <form className="flex w-full">
            <input
              type="text"
              placeholder="Your email address"
              className="w-full p-2 border border-gray-200 outline-none"
            />
            <button className="px-3 py-2 text-white bg-blue-700 rounded-r">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
