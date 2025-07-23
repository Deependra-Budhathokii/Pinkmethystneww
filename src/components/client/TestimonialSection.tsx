"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    image: string;
    quote: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Jane Bennet",
        image: "/public/images/customersays.png",
        quote: "Ladiesvibe provided me the exact quality product I wanted. I'm very much satisfied by their quick delivery process. They delivered my dress within a day."
    },
    {
        id: 2,
        name: "Sarah Johnson",
        image: "/api/placeholder/200/200",
        quote: "Amazing quality and fast shipping! The customer service was exceptional and the product exceeded my expectations."
    },
    {
        id: 3,
        name: "Emily Davis",
        image: "/api/placeholder/200/200",
        quote: "I've been shopping with Pink Amethyst for months now. The quality is consistent and the designs are always on-trend."
    }
];

const TestimonialSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="relative w-full max-w-6xl mx-auto px-4 py-16">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Large flower */}
                    <g transform="translate(100, 80)">
                        <path d="M-20,-10 C-25,-20 -15,-25 -5,-20 C5,-25 15,-20 20,-10 C25,0 15,5 5,0 C15,5 25,15 20,25 C10,30 0,20 -5,10 C-10,20 -20,30 -30,25 C-35,15 -25,5 -15,0 C-25,5 -35,-5 -30,-15 C-20,-20 -10,-10 -20,-10 Z" fill="#f472b6" opacity="0.7" />
                        <circle cx="0" cy="0" r="4" fill="#db2777" />
                    </g>

                    {/* Medium flower */}
                    <g transform="translate(150, 120)">
                        <path d="M-12,-6 C-15,-12 -9,-15 -3,-12 C3,-15 9,-12 12,-6 C15,0 9,3 3,0 C9,3 15,9 12,15 C6,18 0,12 -3,6 C-6,12 -12,18 -18,15 C-21,9 -15,3 -9,0 C-15,3 -21,-3 -18,-9 C-12,-12 -6,-6 -12,-6 Z" fill="#ec4899" opacity="0.8" />
                        <circle cx="0" cy="0" r="2" fill="#be185d" />
                    </g>

                    {/* Small flowers and leaves */}
                    <g transform="translate(120, 50)">
                        <path d="M-8,-4 C-10,-8 -6,-10 -2,-8 C2,-10 6,-8 8,-4 C10,0 6,2 2,0 C6,2 10,6 8,10 C4,12 0,8 -2,4 C-4,8 -8,12 -12,10 C-14,6 -10,2 -6,0 C-10,2 -14,-2 -12,-6 C-8,-8 -4,-4 -8,-4 Z" fill="#f9a8d4" opacity="0.6" />
                    </g>

                    {/* Leaves */}
                    <g transform="translate(80, 100)">
                        <path d="M0,0 C-5,-10 -10,-15 -15,-10 C-20,-5 -15,0 -10,5 C-5,10 0,5 0,0 Z" fill="#86198f" opacity="0.7" />
                        <path d="M5,0 C10,-10 15,-15 20,-10 C25,-5 20,0 15,5 C10,10 5,5 5,0 Z" fill="#a21caf" opacity="0.6" />
                    </g>
                </svg>
            </div>

            {/* Main testimonial content */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Customer Image */}
                <div className="flex-shrink-0">
                    <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={currentTestimonial.image}
                            alt={currentTestimonial.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 max-w-2xl">
                    {/* Quote Icon */}
                    <div className="mb-6">
                        <Quote className="w-12 h-12 text-gray-400 transform rotate-180" />
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-8 font-medium">
                        "{currentTestimonial.quote}"
                    </blockquote>

                    {/* Customer Name */}
                    <div className="mb-8">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                            {currentTestimonial.name}
                        </h3>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex gap-3">
                        <button
                            onClick={prevTestimonial}
                            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 hover:border-pink-400 hover:bg-pink-50 transition-colors duration-200"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>

                        <button
                            onClick={nextTestimonial}
                            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 hover:border-pink-400 hover:bg-pink-50 transition-colors duration-200"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentIndex ? 'bg-pink-500' : 'bg-gray-300'
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialSection;