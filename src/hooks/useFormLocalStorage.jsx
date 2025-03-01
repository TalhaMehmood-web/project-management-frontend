import { useEffect } from "react";

const useFormLocalStorage = (watch, setValue, formKey) => {
  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(formKey));
    if (savedData) {
      // Set form values from saved data
      for (const key in savedData) {
        if (savedData[key] !== undefined) {
          setValue(key, savedData[key]);
        }
      }
    }
  }, [formKey, setValue]);

  // Watch form fields and save them to localStorage whenever they change
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(formKey, JSON.stringify(value)); // Save the form data to localStorage
    });

    return () => subscription.unsubscribe(); // Clean up subscription when the component unmounts
  }, [watch, formKey]);
};

export default useFormLocalStorage;
