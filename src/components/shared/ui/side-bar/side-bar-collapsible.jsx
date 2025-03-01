"use client";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  Home,
  Inbox,
  MessageCircle,
  BellRingIcon,
} from "lucide-react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const iconMap = {
  Home,
  Inbox,
  MessageCircle,
  BellRingIcon,
};

const SidebarCollapsible = ({ title, items, defaultOpen = true }) => {
  return (
    <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
      <SidebarGroup className="select-none">
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger asChild>
            <div className="bg-slate-200 text-nowrap py-6 cursor-pointer text-[20px] font-extrabold flex items-center">
              <p>{title}</p>
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </div>
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const IconComponent = iconMap[item.icon]; // Resolve the icon
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="flex items-center gap-2">
                        {IconComponent && <IconComponent className="w-5 h-5" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default SidebarCollapsible;
