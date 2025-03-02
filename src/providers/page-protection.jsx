"use client";

import { usePathname } from "next/navigation";
import { useAbility } from "./ability-provider";

const PageProtection = ({ children }) => {
  const ability = useAbility();
  const pathname = usePathname();

  return ability?.can("view", pathname) ? (
    children
  ) : (
    <div className="flex flex-1 justify-center items-center">
      You are not authorized to view this page. Request our support team to
      assign you that permission 😊
    </div>
  );
};

export default PageProtection;
