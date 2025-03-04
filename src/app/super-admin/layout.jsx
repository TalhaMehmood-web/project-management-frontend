import Navbar from "@/components/shared/ui/navbar";
import SuperAdminSidebar from "@/components/shared/ui/super-admin/super-admin-side-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AssignPermissionToRoleProvider } from "@/context/assign-permission-to-role-context";

const AdminLayout = ({ children }) => {
  return (
    <AssignPermissionToRoleProvider>
      <SidebarProvider>
        <div className="w-full min-h-screen flex">
          <SuperAdminSidebar />

          <main className="flex  flex-col flex-1">
            <Navbar />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </AssignPermissionToRoleProvider>
  );
};

export default AdminLayout;
