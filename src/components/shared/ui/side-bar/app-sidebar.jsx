"use client";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import SidebarCollapsible from "./side-bar-collapsible";

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
