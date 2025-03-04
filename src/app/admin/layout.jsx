import Navbar from "@/components/shared/ui/navbar";
import AppSidebar from "@/components/shared/ui/side-bar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AbilityProvider } from "@/providers/ability-provider";
import PageProtection from "@/providers/page-protection";

const AdminLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex">
        <AppSidebar />

        <main className="flex container mx-auto max-w-6xl gap-4 flex-col flex-1">
          <Navbar />
          <AbilityProvider>
            <PageProtection>{children}</PageProtection>
          </AbilityProvider>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
