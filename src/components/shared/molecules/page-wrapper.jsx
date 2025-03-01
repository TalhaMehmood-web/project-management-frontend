import React from "react";
import clsx from "clsx";

const PageWrapper = ({ children, className }) => {
  return (
    <section
      className={clsx(
        className,
        "flex-1 flex flex-col bg-white rounded-md  my-2 p-2 shadow-custom-light"
      )}
    >
      {children}
    </section>
  );
};

export default PageWrapper;
