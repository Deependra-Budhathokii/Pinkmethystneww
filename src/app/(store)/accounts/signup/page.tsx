"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import PasswordInput from "@/components/ui/passwordInput";
import * as z from "zod";

// type FormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   phone: string;
//   district: string;
//   province: string;
//   city: string;
//   street: string;
//   landmark: string;
//   profilePhoto: File | null;
// };
const registerFormSchema = z
  .object({
    firstName: z.string().min(3, "Please enter your first name"),
    lastName: z.string().min(3, "Please enter your last name"),
    email: z.string().email().min(6, "Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password should be at least 8 characters long"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    district: z.string().min(1, "District is required"),
    province: z.string().min(1, "Province is required"),
    city: z.string().min(1, "City is required"),
    street: z.string().min(1, "Street address is required"),
    landmark: z.string().optional(),
    profilePhoto: z.instanceof(File).nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type FormData = z.infer<typeof registerFormSchema>;

const RegistrationPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    district: "",
    province: "",
    city: "",
    street: "",
    landmark: "",
    profilePhoto: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    try {
      const validatedData = registerFormSchema.parse(formData);
      console.log("ValidateData", validatedData)

      // Handle image conversion with proper type checking
      let imageData: string | undefined;
      const photo = formData.profilePhoto;
      if (photo) {
        // Type guard to check for null
        imageData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result);
            } else {
              reject(new Error("Failed to convert image to base64"));
            }
          };
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsDataURL(photo); // Now TypeScript knows photo is not null
        });
      }

      const userData = {
        action: "register",
        name: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        password: validatedData.password,
        phone: validatedData.phone,
        image: imageData,
        address: {
          province: validatedData.province,
          district: validatedData.district,
          city: validatedData.city, // ✅ Add this line
          street: validatedData.street,
          landmark: validatedData.landmark,
        },
      };


      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Registration successful!");
      router.push("/accounts/login");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.issues.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
        toast.error("Please fill in all required fields");
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, profilePhoto: e.target.files[0] });
    } else {
      setFormData({ ...formData, profilePhoto: null });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSelectChange = (
    value: string,
    field: "district" | "province"
  ) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-100 to-white p-4">
      <Toaster position="top-center" />
      <Card className="w-full max-w-3xl shadow-lg rounded-lg p-8">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-4xl font-bold text-gray-700">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex flex-col items-center mb-4 md:col-span-2">
              <label
                htmlFor="profilePhoto"
                className="cursor-pointer flex flex-col items-center"
              >
                {formData.profilePhoto ? (
                  <img
                    src={URL.createObjectURL(formData.profilePhoto)}
                    alt="Profile Photo"
                    className="rounded-full w-24 h-24 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center">
                    <UserCircle className="text-gray-500 w-12 h-12" />
                  </div>
                )}
                <span className="text-sm mt-2 text-gray-600">Upload Photo</span>
              </label>
              <input
                id="profilePhoto"
                type="file"
                onChange={handleProfilePhotoChange}
                className="sr-only"
              />
            </div>

            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">{errors.firstName}</span>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">{errors.lastName}</span>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone No.</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div>
              <Label>District</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, district: value })
                }
              >
                <SelectTrigger
                  className={errors.district ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="district1">District 1</SelectItem>
                  <SelectItem value="district2">District 2</SelectItem>
                  <SelectItem value="district3">District 3</SelectItem>
                </SelectContent>
              </Select>
              {errors.district && (
                <span className="text-red-500 text-sm">{errors.district}</span>
              )}
            </div>

            <div>
              <Label>Province</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, province: value })
                }
              >
                <SelectTrigger
                  className={errors.province ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select Province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="province1">Province 1</SelectItem>
                  <SelectItem value="province2">Province 2</SelectItem>
                  <SelectItem value="province3">Province 3</SelectItem>
                </SelectContent>
              </Select>
              {errors.province && (
                <span className="text-red-500 text-sm">{errors.province}</span>
              )}
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="e.g., Kathmandu"
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <span className="text-red-500 text-sm">{errors.city}</span>
              )}
            </div>
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                type="text"
                value={formData.street}
                onChange={handleInputChange}
                className={errors.street ? "border-red-500" : ""}
              />
              {errors.street && (
                <span className="text-red-500 text-sm">{errors.street}</span>
              )}
            </div>
            <div>
              <Label htmlFor="landmark">Landmark (Optional)</Label>
              <Input
                id="landmark"
                type="text"
                value={formData.landmark}
                onChange={handleInputChange}
                className={errors.landmark ? "border-red-500" : ""}
              />
              {errors.landmark && (
                <span className="text-red-500 text-sm">{errors.landmark}</span>
              )}
            </div>

            <div className="md:col-span-2 flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-1/2 mr-2"
                onClick={() => router.push("/accounts/login")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-1/2 bg-pink-300 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
          <p className="text-center mt-4 text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/accounts/login" className="text-pink-500 underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationPage;
