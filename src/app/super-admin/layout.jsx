import Navbar from "@/components/shared/ui/navbar";
import SuperAdminSidebar from "@/components/shared/ui/super-admin/super-admin-side-bar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex">
        <SuperAdminSidebar />

        <main className="flex  flex-col flex-1">
          <Navbar />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
