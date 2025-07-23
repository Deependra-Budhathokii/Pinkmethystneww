import React from 'react';
import { Heart, Star, Shield, Truck } from 'lucide-react';

interface CollectionItem {
    id: string;
    title: string;
    image: string;
    category: string;
}

const AboutUsPage: React.FC = () => {
    const collectionItems: CollectionItem[] = [
        {
            id: '1',
            title: 'Tops For Woman',
            image: '/api/placeholder/300/400',
            category: 'Tops'
        },
        {
            id: '2',
            title: 'Tops For Woman',
            image: '/api/placeholder/300/400',
            category: 'Tops'
        },
        {
            id: '3',
            title: 'Tops For Woman',
            image: '/api/placeholder/300/400',
            category: 'Tops'
        },
        {
            id: '4',
            title: 'Tops For Woman',
            image: '/api/placeholder/300/400',
            category: 'Tops'
        },
        {
            id: '5',
            title: 'Dresses For Woman',
            image: '/api/placeholder/300/400',
            category: 'Dresses'
        },
        {
            id: '6',
            title: 'Dresses For Woman',
            image: '/api/placeholder/300/400',
            category: 'Dresses'
        },
        {
            id: '7',
            title: 'Dresses For Woman',
            image: '/api/placeholder/300/400',
            category: 'Dresses'
        },
        {
            id: '8',
            title: 'Dresses For Woman',
            image: '/api/placeholder/300/400',
            category: 'Dresses'
        }
    ];

    const features = [
        {
            icon: <Heart className="w-8 h-8 text-pink-500" />,
            title: "Body Positive",
            description: "Celebrating every curve and empowering every individual"
        },
        {
            icon: <Star className="w-8 h-8 text-pink-500" />,
            title: "High Quality",
            description: "Premium materials and exceptional craftsmanship"
        },
        {
            icon: <Shield className="w-8 h-8 text-pink-500" />,
            title: "Customer Satisfaction",
            description: "Dedicated support team always ready to help"
        },
        {
            icon: <Truck className="w-8 h-8 text-pink-500" />,
            title: "Fast Shipping",
            description: "Quick and reliable delivery to your doorstep"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br font-wilkyasta bg-[#fdf6f8]">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div>
                    <div className="mb-8 sm:mb-16" >
                        <h2 className="text-[40px] mb-4 max-w-fit relative  before:bg-[#2F2F2F] before:w-full before:bottom-1">About <span className="text-[28px]">Us</span></h2>
                    </div>
                </div>

                {/* Welcome Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
                        Welcome to Pink Amethyst Clothing Shop!
                    </h2>

                    <div className="  text-gray-700 leading-relaxed">
                        <div>
                            <p className="mb-6">
                                At CaptivatingCurves, we believe that fashion should celebrate every curve and empower every individual. Our mission is to provide stylish, high-quality clothing that embraces and enhances the natural beauty of all body types. Whether you're looking for elegant evening wear, trendy everyday outfits, or versatile pieces that can transition from day to night, we have something for everyone.
                            </p>
                            <p className="mb-6">
                                We noticed that many brands neglected the unique needs and preferences of curvy and plus-size individuals. Determined to change this, we set out to create a brand that offers fashionable, flattering, and comfortable clothing for all shapes and sizes. At CaptivatingCurves, customer satisfaction is our top priority. We strive to provide an exceptional shopping experience, from easy navigation on our website to fast and reliable shipping. Our dedicated customer service team is always here to help with any questions or concerns you may have.
                            </p>
                        </div>
                    </div>
                </div>



                {/* Our Collection Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                        Our <span className="text-pink-500">Collection</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto mb-12"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {collectionItems.map((item) => (
                            <div key={item.id} className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-2xl shadow-lg mb-4 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h4 className="text-lg font-semibold">{item.title}</h4>
                                        <p className="text-sm text-gray-200">{item.category}</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-500 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AboutUsPage;