"use client"

import React, { useState } from 'react';
import { CreditCard, ChevronDown } from 'lucide-react';
import Image from 'next/image';
// import Image from Next/link

interface PaymentData {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
    selectedPaymentMethod: string;
}

const PaymentCheckoutPage: React.FC = () => {
    const [paymentData, setPaymentData] = useState<PaymentData>({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
        selectedPaymentMethod: 'credit-card'
    });

    const [showCardForm, setShowCardForm] = useState(false);

    const paymentMethods = [
        {
            id: 'esewa',
            name: 'eSewa',
            logo: '/images/esewa.svg',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200'
        },
        {
            id: 'khalti',
            name: 'Khalti',
            logo: '/images/khalti.svg',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200'
        },
        {
            id: 'ime-pay',
            name: 'IME Pay',
            logo: '/images/ime-pay.svg',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200'
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePaymentMethodSelect = (methodId: string) => {
        setPaymentData(prev => ({
            ...prev,
            selectedPaymentMethod: methodId
        }));
        setShowCardForm(methodId === 'credit-card');
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return v;
        }
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        setPaymentData(prev => ({
            ...prev,
            cardNumber: formatted
        }));
    };

    const handleBack = () => {
        console.log('Back clicked');
    };

    const handleNext = () => {
        console.log('Payment data:', paymentData);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Payment</h1>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    {/* Payment Method Selection */}
                    <div className="mb-8">
                        <h2 className="text-lg font-medium text-gray-900 mb-6">Choose Payment Method</h2>

                        {/* Digital Payment Methods */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.id}
                                    onClick={() => handlePaymentMethodSelect(method.id)}
                                    className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${paymentData.selectedPaymentMethod === method.id
                                        ? `${method.borderColor} ${method.bgColor}`
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-center h-16">
                                        <Image
                                            src={method.logo}
                                            alt={method.name}
                                            className="h-12 object-contain"
                                            width={250}
                                            height={90}
                                        />
                                    </div>
                                    {paymentData.selectedPaymentMethod === method.id && (
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Credit Card Section */}
                    <div className="border-t pt-6">
                        <div
                            onClick={() => handlePaymentMethodSelect('credit-card')}
                            className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 mb-4 ${paymentData.selectedPaymentMethod === 'credit-card'
                                ? 'border-blue-200 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-lg font-medium text-gray-900">Credit Cards</span>
                                {paymentData.selectedPaymentMethod === 'credit-card' && (
                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <Image src="/images/unionpay.svg" width={40} height={25} alt="UnionPay" className="h-6" />
                                <Image src="/images/mastercard.svg" width={40} height={25} alt="Mastercard" className="h-6" />
                                <Image src="/images/khalti.svg" width={40} height={25} alt="Visa" className="h-6" />
                            </div>
                        </div>

                        {/* Credit Card Form */}
                        {paymentData.selectedPaymentMethod === 'credit-card' && (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="space-y-4">
                                    {/* Card Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Card Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={paymentData.cardNumber}
                                                onChange={handleCardNumberChange}
                                                placeholder="Enter card number"
                                                maxLength={19}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-12"
                                            />
                                            <CreditCard className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Expiry Date and CVV */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={paymentData.expiryDate}
                                                onChange={handleInputChange}
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={paymentData.cvv}
                                                onChange={handleInputChange}
                                                placeholder="123"
                                                maxLength={4}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Cardholder Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cardholder Name
                                        </label>
                                        <input
                                            type="text"
                                            name="cardholderName"
                                            value={paymentData.cardholderName}
                                            onChange={handleInputChange}
                                            placeholder="Enter cardholder name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={handleBack}
                        className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 min-w-[120px]"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-pink-400 text-white rounded-lg font-medium hover:bg-pink-500 transition-colors duration-200 min-w-[120px]"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCheckoutPage;