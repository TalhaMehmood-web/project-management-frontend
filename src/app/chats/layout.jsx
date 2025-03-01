import ChatSidebar from "@/components/shared/ui/chat/chat-side-bar";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavbarWrapper from "@/components/shared/ui/navbar/navbar-wrapper";
import VerificationGuard from "@/providers/verification-guard-providers";
import BackToDashboardButton from "@/components/shared/molecules/back-to-dashboard-button";
import VerificationCheckDialog from "@/components/shared/dialogs/verification-check-dialog";
import NotificationBellIcon from "@/components/shared/ui/navbar/notification-bell.icon";

const ChatsLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <ChatSidebar />
        <div className="flex flex-1 flex-col">
          <NavbarWrapper>
            <VerificationGuard>
              <BackToDashboardButton />
            </VerificationGuard>
            <NotificationBellIcon />
          </NavbarWrapper>
          <div className="flex flex-1 ">{children}</div>
        </div>
      </div>
      <VerificationCheckDialog />
    </SidebarProvider>
  );
};

export default ChatsLayout;
