"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAbility } from "./ability-provider";

const PageProtection = ({ children }) => {
  const ability = useAbility();
  const router = useRouter();

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    if (!ability?.can("view", pathname)) {
      console.log("not authorized");
      //   router.replace("/unauthorized");
    }
  }, [ability, pathname, router]);

  return ability?.can("view", pathname) ? children : null;
};

export default PageProtection;
