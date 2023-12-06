import React from "react";

const SingleCompanyArticle = ({ title, description }: any) => {
  return (
    <article className="p-4 border rounded-md shadow-sm site-content">
      <h2 className="mb-4 text-xl font-medium">About {title}</h2>
      <div
        className="text-sm single-content"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </article>
  );
};

export default SingleCompanyArticle;
