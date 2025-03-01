import React from "react";
import clsx from "clsx";
const PageTitle = ({ title, className }) => {
  return <p className={clsx(className, "text-4xl font-extrabold")}>{title}</p>;
};

export default PageTitle;
