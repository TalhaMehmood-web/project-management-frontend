"use client";
import { toast } from "sonner";
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/axios";
import { useRouter } from "next/navigation";
import { USERS_API_ENDPOINTS } from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const logout = () => {
    try {
      toast.promise(axiosInstance.put(USERS_API_ENDPOINTS.LOGOUT), {
        loading: "Logging out...",
        success: "Logged out successfully!",
        error: "Logout failed. Please try again.",
      });

      localStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
