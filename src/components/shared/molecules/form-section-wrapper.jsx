import clsx from "clsx";
const FormSectionWrapper = ({ className, children }) => {
  return (
    <section
      className={clsx(className, "flex  flex-col flex-1 md:p-10 p-5 gap-2 ")}
    >
      {children}
    </section>
  );
};

export default FormSectionWrapper;
