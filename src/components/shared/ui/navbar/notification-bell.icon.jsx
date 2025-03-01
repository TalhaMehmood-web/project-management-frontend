"use client";
import React from "react";
import Tooltip from "../shad-tooltip";
import Link from "next/link";
import { BellIcon } from "lucide-react";

const NotificationBellIcon = () => {
  return (
    <Tooltip text="Notifications" delay={200} side="bottom">
      <Link href="/notifications">
        <BellIcon className="hover:text-green-500 cursor-pointer " />
      </Link>
    </Tooltip>
  );
};

export default NotificationBellIcon;
