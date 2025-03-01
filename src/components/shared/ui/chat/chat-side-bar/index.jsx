import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Inbox, Users, Archive } from "lucide-react"; // Import Lucide icons
import Link from "next/link";
import Tooltip from "../../shad-tooltip";
import { BellIcon } from "lucide-react";
const chats = [
  { name: "Inbox", icon: Inbox, url: "/chats/inbox" },
  { name: "Spaces", icon: Users, url: "/chats/spaces" },
  { name: "Archive", icon: Archive, url: "/chats/archive" },
];

const ChatSidebar = () => {
  return (
    <Sidebar className="select-none" collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.name}>
                  <SidebarMenuButton asChild>
                    <Link href={chat.url} className="flex items-center gap-2">
                      <Tooltip text={chat.name} side="right">
                        <chat.icon className="w-5 h-5" />
                      </Tooltip>
                      <span>{chat.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Notifications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/chats/notifications"
                    className="flex items-center gap-2"
                  >
                    <Tooltip text="Notifications" side="right">
                      <BellIcon className="w-5 h-5" />
                    </Tooltip>
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;
