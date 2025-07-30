"use client";

import { toast } from "react-hot-toast";

export const logout = async (setUser: (u: null) => void) => {
  try {
    // 1. Remove from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("client");

    // 2. Call the universal logout API
    await fetch("/api/logout", {
      method: "POST",
    });

    // 3. Clear UI state
    setUser(null);

    // 4. Toast and redirect
    toast.success("Logged out successfully");
    window.location.href = "/accounts/login";
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Logout failed");
  }
};
