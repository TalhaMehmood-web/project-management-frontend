"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defineAbilitiesFor } from "@/casl/ability";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios";

const AbilityContext = createContext(null);

export function AbilityProvider({ children }) {
  const [ability, setAbility] = useState(defineAbilitiesFor([]));

  const { data, isLoading } = useQuery({
    queryKey: ["permission-get"],
    queryFn: async () => {
      const res = await axiosInstance.get("permissions/get");
      console.log("res?.data?.permissions", res?.data?.permissions);
      return res?.data?.permissions;
    },
    refetchOnWindowFocus: false,
    retry: 0,
  });

  useEffect(() => {
    if (data) {
      setAbility(defineAbilitiesFor(data));
    }
  }, [data]);

  if (isLoading) return <div>Loading permissions...</div>;

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

export function useAbility() {
  return useContext(AbilityContext);
}
