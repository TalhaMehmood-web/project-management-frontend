"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SidebarCollapsible from "./side-bar-collapsible";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

const projectItems = [
  {
    title: "Create",
    url: "/admin/projects/create",
    icon: "Home",
  },
  {
    title: "List",
    url: "/admin/projects/list",
    icon: "Inbox",
  },
];

const usersItem = [
  {
    title: "Create",
    url: "/admin/users/create",
    icon: "Home",
  },
  {
    title: "List",
    url: "/admin/users/list",
    icon: "Inbox",
  },
];
const chatsAndNotifications = [
  {
    title: "Chats",
    url: "/chats/inbox",
    icon: "MessageCircle",
  },
  {
    title: "Notifications",
    url: "/admin/notifications",
    icon: "BellRingIcon",
  },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarMenuItem className="p-2">
          <SidebarMenuButton asChild>
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarCollapsible title="Users" items={usersItem} />
        <SidebarCollapsible title="Projects" items={projectItems} />
        <SidebarCollapsible
          title="Chats and Notifications"
          items={chatsAndNotifications}
        />
      </SidebarContent>
    </Sidebar>
  );
}
