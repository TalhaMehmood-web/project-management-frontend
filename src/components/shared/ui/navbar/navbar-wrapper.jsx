"use client";
import React from "react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";
import Tooltip from "../shad-tooltip";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "@/context/auth-context";

const NavbarWrapper = ({ children, className }) => {
  const { state, isMobile } = useSidebar();
  const { logout } = useAuth();
  return (
    <div
      className={clsx(
        className,
        "flex justify-between items-center py-2 px-6 w-full  h-16  shadow-4xl shadow-slate-500 bg-slate-50 "
      )}
    >
      <Tooltip
        text={
          !isMobile && state === "expanded" ? "Close Sidebar" : "Open Sidebar"
        }
        side="right"
        delay={500}
      >
        <SidebarTrigger />
      </Tooltip>
      <div className="flex flex-1 gap-6 justify-end items-center">
        {children}
        <Tooltip text={"Logout"} delay={200} side="bottom">
          <LogOutIcon
            onClick={logout}
            className="rotate-[-90deg] hover:text-red-500 cursor-pointer "
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default NavbarWrapper;
