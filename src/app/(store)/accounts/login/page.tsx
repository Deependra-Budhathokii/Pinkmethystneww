"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "@/components/ui/passwordInput";
import Cookies from "js-cookie";

type LoginFormData = {
  email: string;
  password: string;
};
interface LoginResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    image?: string;
    district: string;
    province: string;
    city: string;
    street: string;
    landmark: string;
    phone?: string;
  };
  token: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Sending login request with:", {
        action: "login",
        email: formData.email,
      });

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("Error response:", textResponse);

        try {
          const errorData = JSON.parse(textResponse);
          throw new Error(errorData.message || "Login failed");
        } catch (parseError) {
          throw new Error("Server error occurred. Please try again later.");
        }
      }

      const data: LoginResponse = await response.json();

      console.log("Login successful");

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "client",
          JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            image: data.user.image,
            district: data.user.district,
            province: data.user.province,
            city: data.user.city,
            street: data.user.street,
            landmark: data.user.landmark,
            phone: data.user.phone,
          })
        );
      }

      toast.success("Login successful!");
      router.push("/"); // Redirect to homepage
      router.refresh(); // Refresh to update auth state
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-100 to-white p-4">
      <Toaster position="top-center" />
      <Card className="w-full max-w-md shadow-lg rounded-lg p-8">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-4xl font-bold text-gray-700">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center">
                <UserCircle className="text-gray-500 w-12 h-12" />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-1/2 mr-2"
                disabled={isLoading}
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-1/2 bg-pink-300 text-white hover:bg-pink-400"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
          <p className="text-center mt-4 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/accounts/signup"
              className="text-pink-500 hover:text-pink-600 underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
