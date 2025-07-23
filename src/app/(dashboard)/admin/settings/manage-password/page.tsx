"use client"
import LoadingSpinner from '@/components/loader/loading'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import PasswordInput from '@/components/ui/passwordInput'
import React, { useEffect, useState } from 'react'
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation'


const updatePasswordFormSchema = z
    .object({
        currentPassword: z
            .string()
            .min(8, "Password should be at least 8 characters long"),
        newPassword: z
            .string()
            .min(8, "Password should be at least 8 characters long"),
        confirmPassword: z
            .string()
            .min(8, "Password should be at least 8 characters long"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type updatePasswordFormData = z.infer<typeof updatePasswordFormSchema>;


const ManagePasswordPage = () => {
    const [user, setuser] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState<updatePasswordFormData>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const router = useRouter()

    useEffect(() => {
        const userFromLocal = localStorage.getItem("user");
        if (userFromLocal) {
            const parsedUser = JSON.parse(userFromLocal);
            setuser(parsedUser.id);
        }
    }, [user])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        try {
            const validatedData = updatePasswordFormSchema.parse(formData);

            const updatedPassword = {
                action: "update",
                userId: user,
                updates: {
                    currentPassword: validatedData.currentPassword,
                    password: validatedData.confirmPassword,
                }
            }
            setIsLoading(true)
            const response = await fetch("/api/users", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPassword),
            });

            const data = await response.json();


            if (!response.ok) {
                throw new Error(data.message || "Password Change Failed");
            }

            toast.success("Password Change Success");
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            router.push("/admin/login")

        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: { [key: string]: string } = {};
                error.errors.forEach((err) => {
                    const path = err.path.join(".");
                    newErrors[path] = err.message;
                });
                setErrors(newErrors);
            } else {
                const errorMessage = error instanceof Error ? error.message : "Something went wrong";
                toast.error(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Toaster position="top-center" />
            <h2 className='text-3xl font-bold font-playfairdisplay mb-10'>Manage Password</h2>
            {/* Form */}
            <form onSubmit={handleSubmit} className='flex flex-col mt-10 gap-6 font-playfairdisplay' action="">
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1">
                        <Label className='text-xl font-medium mb-4 inline-block'>Current Password</Label>
                        <PasswordInput id='currentPassword' value={formData.currentPassword} onChange={handleInputChange} type='password' name='currentPassword' className='p-5' placeholder='Enter Your Current Password' ></PasswordInput>
                        {errors.currentPassword && (
                            <span className="text-red-500 text-sm">{errors.currentPassword}</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <Label className='text-xl font-medium mb-4 inline-block'>New Password</Label>
                        <PasswordInput id='newPassword' value={formData.newPassword} onChange={handleInputChange} type='password' name='newPassword' className='p-5' placeholder='Enter New Password' ></PasswordInput>
                        {errors.newPassword && (
                            <span className="text-red-500 text-sm">{errors.newPassword}</span>
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    <Label className='text-xl font-medium mb-4 inline-block'>Confirm Password</Label>
                    <PasswordInput id="confirmPassword" type='password' value={formData.confirmPassword} onChange={handleInputChange} name='confirmPassword' className='p-5' placeholder='Enter New Password' ></PasswordInput>
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
                    )}
                </div>
                <div className="flex gap-4 md:gap-16 flex-col md:flex-row md:mt-10">
                    <div className="flex-1">
                        <Button onClick={() => router.back()} className='w-full text-xl' variant={'outline'} >Cancel</Button>
                    </div>
                    <div className="flex-1">
                        {
                            isLoading ? (
                                <Button className='w-full text-xl text-black cursor-wait' disabled>Saving....</Button>
                            ) :
                                (
                                    <Button className='w-full text-xl text-black'>Save</Button>
                                )
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ManagePasswordPage