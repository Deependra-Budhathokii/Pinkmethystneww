"use client";
import LoadingSpinner from "@/components/loader/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from 'next/navigation'


export type LocalUserType = {
    id: string;
    email: string;
    name: string;
    role: string;
    image: string;
    district: string;
    province: string;
    city: string;
    street: string;
    landmark: string;
    phone: string;
};

const updateFormSchema = z.object({
    fullName: z.string().min(3, "Please enter your full name"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    district: z.string().min(1, "District is required"),
    province: z.string().min(1, "Province is required"),
    city: z.string().min(1, "City is required"),
    street: z.string().min(1, "Street address is required"),
    landmark: z.string().optional(),
    profilePhoto: z.instanceof(File).nullable(),
});
type updateFormData = z.infer<typeof updateFormSchema>;

const ManageProfilePage = () => {
    const [user, setuser] = useState<LocalUserType | null>();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const userFromLocal = localStorage.getItem("user");
        if (userFromLocal) {
            const parsedUser = JSON.parse(userFromLocal);
            setuser(parsedUser);

            setFormData((prev) => ({
                ...prev,
                fullName: parsedUser.name || "",
                phone: parsedUser.phone || "",
                district: parsedUser.district || "",
                province: parsedUser.province || "",
                city: parsedUser.city || "",
                street: parsedUser.street || "",
                landmark: parsedUser.landmark || "",
                profilePhoto: null, // Or parsedUser.profilePhoto if applicable
            }));
        }
    }, [isUpdated]);

    const [formData, setFormData] = useState<updateFormData>({
        fullName: "",
        phone: "",
        district: "",
        province: "",
        city: "",
        street: "",
        landmark: "",
        profilePhoto: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleUpdateImageClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({ ...formData, profilePhoto: e.target.files[0] });
        } else {
            setFormData({ ...formData, profilePhoto: null });
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors({});
        try {
            const validatedData = updateFormSchema.parse(formData);

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
                action: "update",
                userId: user?.id,
                updates: {
                    name: `${validatedData.fullName}`,
                    phone: validatedData.phone,
                    image: imageData,
                    address: {
                        province: validatedData.province,
                        district: validatedData.district,
                        street: validatedData.street,
                        landmark: validatedData.landmark,
                        city: validatedData.city,
                    },
                },
            };

            setIsLoading(true);
            const response = await fetch("/api/users", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Update failed");
            }

            let userToLocal = {
                district: data.user.address.district,
                email: data.user.email,
                id: data.user._id,
                image: data.user.image,
                landmark: data.user.address.landmark,
                name: data.user.name,
                phone: data.user.phone,
                province: data.user.address.province,
                city: data.user.address.city,
                role: data.user.role,
                street: data.user.address.street,
            };

            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(userToLocal));
            setIsUpdated(!isUpdated);

            toast.success("Update successful!");
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: { [key: string]: string } = {};
                error.errors.forEach((err) => {
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

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold font-playfairdisplay mb-10">
                Manage Profile
            </h2>
            {/* Personal Details */}
            <div className="flex gap-16 items-center flex-wrap">
                <div className="flex flex-col gap-4 items-center">
                    {formData.profilePhoto ? (
                        <img
                            src={URL.createObjectURL(formData.profilePhoto)}
                            alt="Profile Photo"
                            className="rounded-full object-cover h-[224px]"
                            height={224}
                            width={224}
                        />
                    ) : (
                        <Image
                            src={
                                user && user.image
                                    ? user.image
                                    : require("@/../public/images/noprofile.png")
                            }
                            className="rounded-full object-cover h-[224px]"
                            height={224}
                            width={224}
                            alt="Profile"
                        />
                    )}
                    <label htmlFor="profilePhoto">
                        <span className="grow-0 text-black font-playfairdisplay font-medium text-lg inline-block bg-primary px-4 py-2 cursor-pointer rounded-md">
                            Change Picture
                        </span>
                    </label>
                    <input
                        id="profilePhoto"
                        type="file"
                        onChange={handleUpdateImageClick}
                        className="sr-only"
                    />
                </div>
                <div className="flex flex-col font-playfairdisplay gap-6">
                    <span className="font-playfairdisplay text-[26px] font-semibold">
                        {user && user?.name ? user?.name : "Loading..."}
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <svg
                            width="30"
                            height="32"
                            viewBox="0 0 31 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.5 3.74805C10.6865 3.74805 6.78125 7.46502 6.78125 12.043C6.78125 17.3105 12.5938 25.6581 14.728 28.5414C14.8166 28.6631 14.9327 28.7621 15.0669 28.8304C15.2011 28.8987 15.3495 28.9343 15.5 28.9343C15.6505 28.9343 15.7989 28.8987 15.9331 28.8304C16.0673 28.7621 16.1834 28.6631 16.272 28.5414C18.4062 25.6594 24.2188 17.3148 24.2188 12.043C24.2188 7.46502 20.3135 3.74805 15.5 3.74805Z"
                                stroke="#805387"
                                strokeWidth="1.9375"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15.5 15.373C17.1051 15.373 18.4062 14.0719 18.4062 12.4668C18.4062 10.8617 17.1051 9.56055 15.5 9.56055C13.8949 9.56055 12.5938 10.8617 12.5938 12.4668C12.5938 14.0719 13.8949 15.373 15.5 15.373Z"
                                stroke="#805387"
                                strokeWidth="1.9375"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <p className="capitalize" >
                            {user && user
                                ? user?.district +
                                ", " +
                                user?.province +
                                ", " +
                                user?.city +
                                ", " +
                                user?.street +
                                ", " +
                                user?.landmark
                                : "Loading..."}
                        </p>
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <svg
                            width="30"
                            height="32"
                            viewBox="0 0 30 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M26.059 19.4111L20.5383 16.9373L20.5231 16.9302C20.2365 16.8076 19.9238 16.7585 19.6134 16.7871C19.303 16.8157 19.0047 16.9213 18.7453 17.0943C18.7148 17.1144 18.6854 17.1363 18.6574 17.1599L15.8051 19.5916C13.9981 18.7138 12.1324 16.8623 11.2547 15.0787L13.6899 12.183C13.7133 12.1537 13.7356 12.1244 13.7567 12.0927C13.9259 11.8341 14.0286 11.5376 14.0556 11.2297C14.0826 10.9218 14.033 10.612 13.9113 10.3279V10.3138L11.4305 4.78375C11.2696 4.41257 10.993 4.10337 10.642 3.90231C10.291 3.70124 9.88437 3.61909 9.48282 3.66812C7.8949 3.87708 6.43733 4.65691 5.38235 5.86198C4.32738 7.06705 3.74714 8.61495 3.75001 10.2166C3.75001 19.5212 11.3203 27.0916 20.625 27.0916C22.2266 27.0944 23.7745 26.5142 24.9796 25.4592C26.1847 24.4042 26.9645 22.9467 27.1734 21.3587C27.2226 20.9573 27.1406 20.5508 26.9397 20.1998C26.7389 19.8488 26.43 19.5721 26.059 19.4111ZM20.625 25.2166C16.6481 25.2122 12.8353 23.6305 10.0232 20.8184C7.2111 18.0063 5.62935 14.1935 5.62501 10.2166C5.6206 9.07221 6.03288 7.96538 6.78486 7.10278C7.53683 6.24017 8.57708 5.68078 9.71134 5.52906C9.71087 5.53374 9.71087 5.53845 9.71134 5.54312L12.1723 11.0509L9.75001 13.9502C9.72538 13.9784 9.70304 14.0086 9.68321 14.0404C9.50686 14.311 9.40341 14.6226 9.38288 14.9449C9.36235 15.2673 9.42543 15.5894 9.56603 15.8802C10.6277 18.0517 12.8156 20.2232 15.0106 21.2837C15.3035 21.423 15.6275 21.4839 15.951 21.4605C16.2745 21.4371 16.5864 21.3302 16.8563 21.1502C16.8864 21.13 16.9154 21.1081 16.943 21.0845L19.7918 18.6541L25.2996 21.1209H25.3125C25.1626 22.2567 24.6041 23.2991 23.7413 24.0529C22.8786 24.8067 21.7707 25.2204 20.625 25.2166Z"
                                fill="#805387"
                            />
                        </svg>
                        <p>{user && user?.phone ? user?.phone : "Loading..."}</p>
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <svg
                            width="26"
                            height="31"
                            viewBox="0 0 30 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M28.0312 7.7493L16.1944 17.5518C15.858 17.8305 15.4349 17.983 14.9981 17.983C14.5613 17.983 14.1382 17.8305 13.8019 17.5518L1.97063 7.7493C1.90714 7.94038 1.87485 8.14044 1.875 8.3418V23.3418C1.875 23.8391 2.07254 24.316 2.42417 24.6676C2.77581 25.0193 3.25272 25.2168 3.75 25.2168H26.25C26.7473 25.2168 27.2242 25.0193 27.5758 24.6676C27.9275 24.316 28.125 23.8391 28.125 23.3418V8.3418C28.1257 8.14055 28.0941 7.94049 28.0312 7.7493ZM3.75 4.5918H26.25C27.2446 4.5918 28.1984 4.98688 28.9016 5.69015C29.6049 6.39341 30 7.34723 30 8.3418V23.3418C30 24.3364 29.6049 25.2902 28.9016 25.9934C28.1984 26.6967 27.2446 27.0918 26.25 27.0918H3.75C2.75544 27.0918 1.80161 26.6967 1.09835 25.9934C0.395088 25.2902 0 24.3364 0 23.3418V8.3418C0 7.34723 0.395088 6.39341 1.09835 5.69015C1.80161 4.98688 2.75544 4.5918 3.75 4.5918ZM3.35625 6.4668L13.8113 15.0974C14.1461 15.374 14.5666 15.5258 15.0009 15.5268C15.4352 15.5278 15.8563 15.378 16.1925 15.103L26.7525 6.4668H3.35625Z"
                                fill="#805387"
                            />
                        </svg>
                        <p>{user && user?.email ? user?.email : "Loading..."}</p>
                    </span>
                </div>
            </div>
            {/* Form */}
            <form
                onSubmit={handleFormSubmit}
                className="flex flex-col mt-10 gap-6 font-playfairdisplay"
                action=""
            >
                <div className="flex-1">
                    <Label className="text-xl font-medium mb-4 inline-block">
                        Full Name
                    </Label>
                    <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        type="text"
                        className="p-5"
                        name="firstName"
                        placeholder="Enter Your FirstName"
                    ></Input>
                    {errors.fullName && (
                        <span className="text-red-500 text-sm">{errors.fullName}</span>
                    )}
                </div>
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1">
                        <Label className="text-xl font-medium mb-4 inline-block">
                            Phone No.
                        </Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            type="number"
                            className="p-5"
                            placeholder="Enter Your Phone"
                        ></Input>
                        {errors.phone && (
                            <span className="text-red-500 text-sm">{errors.phone}</span>
                        )}
                    </div>
                </div>
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1">
                        <Label className="text-xl font-medium mb-4 inline-block">
                            District
                        </Label>
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
                                <SelectItem className="font-playfairdisplay" value="district1">
                                    District 1
                                </SelectItem>
                                <SelectItem className="font-playfairdisplay" value="district2">
                                    District 2
                                </SelectItem>
                                <SelectItem className="font-playfairdisplay" value="district3">
                                    District 3
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.district && (
                            <span className="text-red-500 text-sm">{errors.district}</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <Label className="text-xl font-medium mb-4 inline-block">
                            Province
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                setFormData({ ...formData, province: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Province" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem className="font-playfairdisplay" value="province1">
                                    Province 1
                                </SelectItem>
                                <SelectItem className="font-playfairdisplay" value="province2">
                                    Province 2
                                </SelectItem>
                                <SelectItem className="font-playfairdisplay" value="province3">
                                    Province 3
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.province && (
                            <span className="text-red-500 text-sm">{errors.province}</span>
                        )}
                    </div>
                </div>
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1">
                        <Label
                            className="text-xl font-medium mb-4 inline-block"
                            htmlFor="city"
                        >
                            City
                        </Label>
                        <Input
                            id="city"
                            type="text"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="e.g., Kathmandu"
                        />
                        {errors.city && (
                            <span className="text-red-500 text-sm">{errors.city}</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <Label
                            className="text-xl font-medium mb-4 inline-block"
                            htmlFor="street"
                        >
                            Street Address
                        </Label>
                        <Input
                            value={formData.street}
                            onChange={handleInputChange}
                            id="street"
                            type="text"
                        />
                        {errors.street && (
                            <span className="text-red-500 text-sm">{errors.street}</span>
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    <Label
                        className="text-xl font-medium mb-4 inline-block"
                        htmlFor="landmark"
                    >
                        Landmark (Optional)
                    </Label>
                    <Input
                        value={formData.landmark}
                        onChange={handleInputChange}
                        id="landmark"
                        type="text"
                    />
                    {errors.landmark && (
                        <span className="text-red-500 text-sm">{errors.landmark}</span>
                    )}
                </div>
                {/* <div className="flex-1">
                    <Label className='text-xl font-medium mb-4 inline-block'>Email</Label>
                    <Input type='email' className='p-5' placeholder='Enter Your Email' ></Input>
                </div> */}
                <div className="flex gap-4 md:gap-16 flex-col md:flex-row mb-10">
                    <div className="flex-1">
                        <Button onClick={() => router.back()} className="w-full text-xl" variant={"outline"}>
                            Cancel
                        </Button>
                    </div>
                    <div className="flex-1">
                        <Button className="w-full text-xl text-black">Save</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ManageProfilePage;
