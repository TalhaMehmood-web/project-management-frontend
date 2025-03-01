"use client";
import { useAuth } from "@/context/auth-context";
import { ROLES } from "@/utils/enum";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
const BackToDashboardButton = () => {
  const { user } = useAuth();
  const redirectLink =
    user?.role === ROLES.SUPER_ADMIN
      ? "/super-admin/manage/list"
      : "/admin/users/list";
  return (
    <>
      <Link href={redirectLink}>
        <Button>
          <ChevronLeft /> Back To Dashboard
        </Button>
      </Link>
    </>
  );
};

export default BackToDashboardButton;
