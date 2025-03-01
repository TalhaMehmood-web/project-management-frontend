import React from "react";
import clsx from "clsx";
const FormStepItemWrapper = ({ children, className }) => {
  return (
    <div
      className={clsx(
        className,
        " shadow-xl grid  grid-cols-1 lg:grid-cols-2 gap-2 flex-1 p-10 rounded-md"
      )}
    >
      {children}
    </div>
  );
};

export default FormStepItemWrapper;
