"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function LogoutBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.push("/admin/login");
        toast.success("Logged out successfully");
      } else {
        console.error("Logout failed");
        toast.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleLogout}
        disabled={isLoading}
        className="flex items-center gap-2 text-black bg-transparent shadow-none text-[24px]"
      >
        <LogOut className="h-12 w-12" />
        <span className="hidden md:inline">
          {isLoading ? "Logging out..." : "Logout"}
        </span>
      </Button>
    </div>
  );
}
