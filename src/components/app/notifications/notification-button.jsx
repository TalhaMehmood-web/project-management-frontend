import React from "react";
const NotificationButton = ({ children }) => {
  return (
    <button className=" hover:bg-slate-100 p-2 rounded-full ">
      {children}
    </button>
  );
};

export default NotificationButton;
