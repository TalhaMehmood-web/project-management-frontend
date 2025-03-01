import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const useURLSync = (defaultParams = {}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse URL params or fallback to default
  const getInitialParams = () => {
    const params = {};
    for (const key of Object.keys(defaultParams)) {
      params[key] = searchParams.get(key) || defaultParams[key];
    }
    return params;
  };

  const [params, setParams] = useState(getInitialParams);

  // Update the URL whenever params change
  const updateURL = useCallback(
    (newParams) => {
      const url = new URL(window.location);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          url.searchParams.set(key, value);
        } else {
          url.searchParams.delete(key);
        }
      });
      router.push(url.toString(), { scroll: false });
    },
    [router]
  );

  // Sync state with URL changes
  useEffect(() => {
    setParams(getInitialParams());
  }, [searchParams]);

  // Update params & URL together
  const setFilter = (key, value) => {
    setParams((prev) => {
      const updated = { ...prev, [key]: value };
      updateURL(updated);
      return updated;
    });
  };

  return [params, setFilter];
};

export default useURLSync;
