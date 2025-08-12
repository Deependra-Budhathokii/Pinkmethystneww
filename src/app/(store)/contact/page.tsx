"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
// import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster } from "@/components/ui/sonner";
// import { useForm } from 'react-hook-form';
// import { contactSchema, TcontactSchema } from '@/schemas/contact.schema';
// import { addMessage } from '@/actions/contact.action';
import { toast } from "sonner";
import { addMessage } from "@/actions/contact.action";
import { useForm } from "react-hook-form";

const ContactSection = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError
    } = useForm();


    const onSubmit = async (data: any) => {
        //  submit  server activity

        const res = await addMessage(data);
        if (res.success) {
            toast.success("We've got your inquiry and are on it! Expect a response soon. Thanks 🤝");
            // setLoading(false);
            reset();

        } else {
            // setLoading(false);
            toast.error("Looks like there's a small glitch in the system. Please verify your information and resend your message. We're working to fix this issue! 🛠️");
        }

        reset()
    }

    return (
        <section className="container py-16 font-playfairdisplay">
            <h2 className="text-4xl sm:text-5xl font-semibold mb-10">
                <span className="text-[#000]">Contact</span>{" "}
                <span className="text-gray-500">Us</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Contact Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        <div>
                            <label className="block mb-2 font-medium">Name</label>
                            <Input {
                                ...register("userName")
                            }
                                placeholder="Enter Your Name" />
                            {errors.userName && (<p className='text-rose-700'>{`${errors.userName.message}`}</p>)}
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Email</label>
                            <Input {
                                ...register("email")
                            } type="email" placeholder="Enter Your Email" />
                            {errors.email && (<p className='text-rose-700'>{`${errors.email.message}`}</p>)}
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Message</label>
                            <Textarea {
                                ...register("message")
                            } placeholder="Write a message" rows={5} />
                            {errors.message && (<p className='text-rose-700'>{`${errors.message.message}`}</p>)}
                        </div>
                        <Button className="bg-[#e6aeb2] hover:bg-[#d7999d] text-white">
                            Send Message
                        </Button>
                    </div>

                </form>

                {/* Contact Info & Map */}
                <div className="space-y-6">
                    <div className="space-y-4 text-sm text-gray-700">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-[#805387]" />
                            <span>Imadol, Lalitpur</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-[#805387]" />
                            <span>9812345678</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-[#805387]" />
                            <span>captivatingcurves@gmail.com</span>
                        </div>
                    </div>

                    <div className="rounded-md overflow-hidden shadow border h-[250px] sm:h-[300px]">
                        <iframe
                            className="w-full h-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0224906823953!2d85.32750301506595!3d27.692290382796063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19cf42f91ebf%3A0x38b2b3ab6cd5c31!2sImadol%2C%20Lalitpur!5e0!3m2!1sen!2snp!4v1689328074325!5m2!1sen!2snp"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
