"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CheckoutData {
    firstName: string;
    lastName: string;
    phoneNo: string;
    district: string;
    province: string;
    city: string;
    postalCode: string;
    streetAddress: string;
    landmark: string;
    discountCode: string;
}

const CheckoutPage: React.FC = () => {
    const [formData, setFormData] = useState<CheckoutData>({
        firstName: '',
        lastName: '',
        phoneNo: '',
        district: '',
        province: '',
        city: '',
        postalCode: '',
        streetAddress: '',
        landmark: '',
        discountCode: ''
    });

    const [products] = useState<Product[]>([
        {
            id: '1',
            name: 'Black Top',
            price: 2000,
            image: '/api/placeholder/80/80',
            quantity: 10
        },
        {
            id: '2',
            name: 'Leather Jacket',
            price: 6000,
            image: '/api/placeholder/80/80',
            quantity: 1
        }
    ]);

    const districts = ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan'];
    const provinces = ['Province 1', 'Province 2', 'Bagmati', 'Gandaki', 'Lumbini'];

    const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const tax = 600;
    const delivery = 100;
    const discount = 1000;
    const total = subtotal + tax + delivery - discount;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBack = () => {
        // Handle back navigation
        console.log('Back clicked');
    };

    const handleNext = () => {
        // Handle form submission
        console.log('Form data:', formData);
        console.log('Products:', products);
    };

    return (
        <div className="min-h-screen  py-8 font-playfairdisplay bg-[#fdf6f8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Shipping Address */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Address</h2>

                        <div className="space-y-4">
                            {/* First Name and Last Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your FirstName"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your LastName"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone No.
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleInputChange}
                                    placeholder="Enter Your Contact no."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                            </div>

                            {/* District and Province */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        District
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.district}
                                            onChange={(e) => handleSelectChange('district', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none bg-white"
                                        >
                                            <option value="">Select District</option>
                                            {districts.map(district => (
                                                <option key={district} value={district}>{district}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Province
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.province}
                                            onChange={(e) => handleSelectChange('province', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none bg-white"
                                        >
                                            <option value="">Select Province</option>
                                            {provinces.map(province => (
                                                <option key={province} value={province}>{province}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* City and Postal Code */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="Eg. Kathmandu"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Postal code
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        placeholder="Postal code"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Street Address and Landmark */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        name="streetAddress"
                                        value={formData.streetAddress}
                                        onChange={handleInputChange}
                                        placeholder="Enter Your Address"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Landmark(Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="landmark"
                                        value={formData.landmark}
                                        onChange={handleInputChange}
                                        placeholder="Add Additional Info"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Billing Details */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Billing Details</h2>

                        {/* Product Headers */}
                        <div className="flex justify-between items-center mb-4 pb-2 border-b">
                            <span className="text-sm font-medium text-gray-700">Product</span>
                            <span className="text-sm font-medium text-gray-700">Price</span>
                        </div>

                        {/* Product List */}
                        <div className="space-y-4 mb-6">
                            {products.map((product) => (
                                <div key={product.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-900">{product.name}</h3>
                                            <p className="text-sm text-gray-600">Rs. {product.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">Rs. {(product.price * product.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-3 border-t pt-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax</span>
                                <span className="font-medium">Rs. {tax}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Delivery</span>
                                <span className="font-medium">Rs. {delivery}</span>
                            </div>

                            {/* Discount Code */}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Discount Code</span>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        name="discountCode"
                                        value={formData.discountCode}
                                        onChange={handleInputChange}
                                        placeholder="Enter Code"
                                        className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    />
                                    <span className="font-medium">Rs. {discount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex justify-between pt-3 border-t font-semibold text-lg">
                                <span>Total</span>
                                <span>Rs. {total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleBack}
                        className="px-8 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                        Back
                    </button>

                    <Link href="/checkout/checkoutpay">
                        <button
                            onClick={handleNext}
                            className="px-8 py-3 bg-pink-400 text-white rounded-md font-medium hover:bg-pink-500 transition-colors duration-200"
                        >
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;