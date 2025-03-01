import { useEffect, useState } from "react";

const useLocalStorageField = (storageKey, fieldName) => {
  const [fieldValue, setFieldValue] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);
    if (storedData !== null) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData && fieldName in parsedData) {
          setFieldValue(parsedData[fieldName]);
        }
      } catch (error) {
        console.error("Error parsing localStorage data", error);
      }
    }
  }, [storageKey, fieldName]);

  return fieldValue;
};

export default useLocalStorageField;
