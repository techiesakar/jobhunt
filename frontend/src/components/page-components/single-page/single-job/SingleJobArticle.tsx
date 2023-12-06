import React from "react";

const SingleJobArticle = ({ title, description }: any) => {
  return (
    <article className="site-content">
      <h2 className="mb-4 text-xl font-medium">About {title}</h2>
      <div
        className="text-sm single-content"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </article>
  );
};

export default SingleJobArticle;
