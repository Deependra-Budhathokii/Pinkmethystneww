import React from 'react'
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CustomerSay = () => {
    return (
        <>
            <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col space-y-4">
                    {/* Testimonial Quote */}
                    <div className="flex items-start">
                        <Quote className="h-6 w-6 text-pink-500 mt-1 flex-shrink-0" />
                        <blockquote className="text-gray-700 pl-2 italic">
                            Ladiesvibe provided me the exact quality product I wanted. I'm very much satisfied by their quick delivery process. They delivered my dress within a day.
                        </blockquote>
                    </div>

                    {/* Customer Info with Image */}
                    <div className="flex items-center space-x-4 pt-2">
                        {/* Customer Image - replace with your actual image */}
                        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-pink-100">
                            <img
                                src="/path-to-customer-image.jpg"
                                alt="Customer"
                                className="w-full h-full object-cover"

                            />
                        </div>

                        <div>
                            <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                            <p className="text-sm text-gray-500">Verified Customer</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default CustomerSay