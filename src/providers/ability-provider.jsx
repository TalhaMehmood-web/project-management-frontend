"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defineAbilitiesFor } from "@/casl/ability";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

const AbilityContext = createContext(null);

export function AbilityProvider({ children }) {
  const [ability, setAbility] = useState(defineAbilitiesFor([]));
  // Get current pathname using Next.js hook.
  const pathname = usePathname();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["permission-get"],
    queryFn: async () => {
      const res = await axiosInstance.get("permissions/get");
      return res?.data?.permissions;
    },
  });

  // Whenever the pathname changes, trigger a refetch.
  useEffect(() => {
    if (pathname) {
      refetch();
    }
  }, [pathname, refetch]);

  // Update ability when permissions data is fetched.
  useEffect(() => {
    if (data) {
      setAbility(defineAbilitiesFor(data));
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="flex flex-1 justify-center items-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

export function useAbility() {
  return useContext(AbilityContext);
}
