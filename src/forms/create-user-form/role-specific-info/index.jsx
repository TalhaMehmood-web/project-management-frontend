import React from "react";
import useLocalStorageField from "@/hooks/useLocalStorageField";
import TeamLeadInfo from "./team-lead-info";
import ClientInfo from "./client-info";
import TeamMemberInfo from "./team-member-info";
const RoleSpecificInfo = () => {
  const userType = useLocalStorageField("createUserForm", "userType");
  console.log("usertype", userType);
  return (
    <div className="flex flex-1 ">
      {userType === "client" && <ClientInfo />}
      {userType === "teamLead" && <TeamLeadInfo />}
      {userType === "teamMember" && <TeamMemberInfo />}
    </div>
  );
};

export default RoleSpecificInfo;
