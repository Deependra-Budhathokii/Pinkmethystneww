import { Mail, MapPin, Phone, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="container bg-gradient-to-br from-[#FF9FAB] to-[#8A4F9E] text-white pt-16 pb-6 px-4 md:px-12 lg:px-24 font-playfairdisplay">
            {/* Newsletter */}
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Sign Up For The Newsletter</h2>
                <p className="text-sm md:text-base mb-4">Subscribe our Newsletter for the latest news and update</p>
                <div className="max-w-md mx-auto flex items-center gap-2 bg-white rounded-full px-4 py-2">
                    <Input
                        placeholder="Enter Your Email"
                        className="border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black bg-transparent px-0"
                    />
                    <Button className="rounded-full px-6 bg-[#69306D] hover:bg-[#582a5c] text-white">Subscribe</Button>
                </div>
            </div>

            <div className="border-t border-white/20 mb-10"></div>

            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm text-white">
                {/* Left - Brand Info */}
                <div>
                    <div className="text-2xl font-bold mb-4">Pink Amethyst</div>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                            <MapPin size={16} /> Imadol, Lalitpur
                        </div>
                        <div className="flex items-start gap-2">
                            <Phone size={16} /> 9812345678
                        </div>
                        <div className="flex items-start gap-2">
                            <Mail size={16} /> pink_amrthyst@gmail.com
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>About Us</li>
                        <li>Categories</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                {/* Terms & Conditions */}
                <div>
                    <h3 className="font-semibold mb-4 text-lg">Terms and Condition</h3>
                    <ul className="space-y-2">
                        <li>Privacy & Policy</li>
                        <li>Term & Services</li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="font-semibold mb-4 text-lg">Follow Us</h3>
                    <div className="flex gap-4">
                        <Facebook className="w-5 h-5" />
                        <Instagram className="w-5 h-5" />
                        <Twitter className="w-5 h-5" />
                        <Youtube className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="border-t border-white/20 my-10"></div>

            {/* Bottom Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-center text-xs text-white gap-4">
                <div>© Copyright 2023 <span className="font-semibold">MetaLogic Software Pvt. Ltd</span>. All rights reserved.</div>
                <div className="flex items-center gap-3 text-white text-sm">
                    <span className="opacity-80">We Accept</span>
                    <img src="/icons/esewa.png" alt="eSewa" className="h-5" />
                    <img src="/icons/khalti.png" alt="Khalti" className="h-5" />
                    <img src="/icons/imepay.png" alt="IMEPay" className="h-5" />
                </div>
            </div>
        </footer>
    );
}
