"use client";

import { useRouter } from "next/navigation";
import { clearAuthData } from "@/lib/auth";

export const useAuth = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      // Call logout API endpoint
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear all auth-related data
      clearAuthData();

      // Redirect to login page
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { logout };
};
