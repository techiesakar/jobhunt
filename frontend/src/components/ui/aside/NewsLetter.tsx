import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-md shadow">
      <h2 className="text-lg font-semibold">Get notified</h2>
      <p className="">Whenever new and interesting job jistings are added.</p>
      <input
        type="email"
        className="p-3 border border-gray-200 rounded outline-none"
        placeholder="Your email address"
      />
      <button className="px-8 py-2 text-white bg-blue-800 rounded">
        Subscribe
      </button>
    </div>
  );
};

export default NewsLetter;
