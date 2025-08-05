"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { Star, StarOff } from 'lucide-react';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import chartSize from '@/../public/size/sizeChart.png';
import LoadingSpinner from '@/components/loader/loading';
import { useReviews } from '@/hooks/use-reviews';
import { useAddToCart } from '@/hooks/useAddToCart';
import toast, { Toaster } from 'react-hot-toast';
import CartDrawer from '@/components/cart/CartDrawer';
import { useUser } from '@/context/UserContext';

interface ProductDetailsProps {
    product: any;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const { mutate: addToCart, isPending } = useAddToCart();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { user } = useUser();
    const swiperRef = useRef<any>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    const { data: allreviews } = useReviews();

    // const reviews = allreviews?.filter(
    //     (review) => review.product._id === product._id
    // ).map((review) => ({
    //     id: review._id,
    //     review: review.review,
    //     userPhoto: review.user.image,
    //     rating: review.rating,
    //     userName: review.user.name,
    // })).slice(0, 4);

    // useEffect(() => {
    //     if (swiperRef.current) {
    //         swiperRef.current.navigation.init();
    //         swiperRef.current.navigation.update();
    //     }
    // }, []);

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please log in to add items to your cart.");
            setTimeout(() => {
                window.location.href = "/accounts/login";
            }, 1000);
            return;
        }

        if (!product || !product._id) {
            toast.error("Invalid product data.");
            return;
        }

        addToCart(
            {
                productId: product._id,
                quantity: 1,
            },
            {
                onSuccess: () => {
                    toast.dismiss();
                    toast.success(`${product.name} added to cart!`);
                    setDrawerOpen(true);
                },
                onError: () => {
                    toast.dismiss();
                    toast.error("Failed to add to cart. Please try again.");
                },
            }
        );
    };

    if (!product) return <LoadingSpinner />;

    return (
        <>
            <CartDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
            <div className='font-playfairdisplay container mx-auto'>
                <Toaster position="top-center" reverseOrder={false} />

                <div className="mt-10 flex gap-8 flex-wrap lg:flex-nowrap">
                    {/* Product Image */}
                    <div className="w-full lg:w-[35%]">
                        <Swiper
                            spaceBetween={10}
                            navigation={{ prevEl: '.custom-prev-button', nextEl: '.custom-next-button' }}
                            loop={true}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2 text-white max-h-[500px]"
                        >
                            {product?.images.map((image, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="relative">
                                        <Image src={image} width={500} height={300} alt='Product Image' style={{ height: "450px", width: "500px", objectFit: "cover" }} />
                                        <div className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 text-xs font-bold rounded-tr-md rounded-bl-md shadow">50% off</div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="flex gap-4 justify-center mt-4">
                            <button className="custom-prev-button p-3 border border-secondary rounded-lg">‹</button>
                            <button className="custom-next-button p-3 border border-secondary rounded-lg">›</button>
                        </div>

                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper cursor-pointer mt-4"
                        >
                            {product?.images.map((image, idx) => (
                                <SwiperSlide key={idx}>
                                    <Image src={image} width={120} height={100} style={{ height: "100px" }} alt='Product Thumbnail' />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h4 className='text-3xl font-semibold'>{product?.name}</h4>
                            <span className="text-sm text-green-600 font-semibold">In Stock</span>
                        </div>

                        <div className="flex gap-8 items-center flex-wrap">
                            <div className="flex items-baseline gap-2">
                                <span className='text-2xl font-semibold'>Rs. {product?.final_price}</span>
                                <span className="line-through text-gray-400 text-lg">Rs. {product?.original_price}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 text-sm">
                                <StarRating rating={product?.rating_avg ?? 0} />
                                <span className="text-gray-500">{product?.review_count ?? 0} Reviews</span>
                            </div>
                        </div>

                        <div>
                            <span>Available Colors</span>
                            <div className="flex gap-4 mt-3 flex-wrap">
                                {product?.color.map((color) => (
                                    <div key={color} className='rounded-md h-8 w-12 border' style={{ background: color }}></div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span>Available Sizes</span>
                            <div className="flex gap-4 mt-3 flex-wrap">
                                {product?.size.map((size) => (
                                    <div key={size} className='rounded-md border py-2 px-4'>{size}</div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span>Quantity :</span>
                            <input className='ml-2 p-2 w-20 focus:outline-none border rounded-md' type="number" defaultValue={1} min={1} />
                        </div>

                        <div className='flex gap-3 items-center'>
                            <span>Size Chart :</span>
                        </div>
                        <Image src={chartSize} alt='Size Chart' style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }} />

                        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md">
                            <button
                                disabled={isPending}
                                onClick={handleAddToCart}
                                className="bg-[#e6aeb2] hover:bg-[#d7999d] text-white py-3 px-6 rounded-md w-full flex justify-center items-center gap-2"
                            >
                                Add to cart
                            </button>
                            <button className="border border-[#805387] text-[#805387] py-3 px-6 rounded-md w-full">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="my-6">
                    <span className='text-2xl font-bold'>Product Description</span>
                    <p className="mt-4">{product?.description}</p>
                </div>

                <div className="my-6">
                    <span className='text-xl font-bold'>Features</span>
                    <ul className="mt-4 space-y-1">
                        {product?.features.map((feature) => (
                            <li key={feature._id}>{feature.name} : {feature.value}</li>
                        ))}
                    </ul>
                </div>

                <div className="my-8">
                    <div className="flex justify-between">
                        <span className='text-2xl font-bold'>Customer Reviews</span>
                        <Link href={`/admin/reviews/`} className='underline text-secondary'>View All Reviews</Link>
                    </div>

                    {/* <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {reviews?.length === 0 ? (
                            <span className='italic'>Reviews Not Added For This Product</span>
                        ) : (
                            reviews.map((review) => (
                                <div key={review.id} className="flex gap-4 p-4 border border-secondary rounded-md items-center">
                                    <div className="flex flex-col items-center min-w-[20%]">
                                        <Image src={review.userPhoto || "https://picsum.photos/id/64/4326/2884.jpg"} className='rounded-full object-cover' height={48} width={48} alt='Reviewer' />
                                        <span className='font-semibold text-sm text-center mt-1'>{review.userName}</span>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="text-sm">{review.review.slice(0, 250)}...</p>
                                </div>
                            ))
                        )}
                    </div> */}
                </div>
            </div>
        </>
    );
};

export const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const totalStars = 5;

    return (
        <div className="flex">
            {Array.from({ length: totalStars }).map((_, index) => (
                index < fullStars ? (
                    <Star key={`full-${index}`} className="text-yellow-500" fill="currentColor" width={12} height={12} />
                ) : (
                    <StarOff key={`empty-${index}`} className="text-gray-400" width={12} height={12} />
                )
            ))}
        </div>
    );
};

export default ProductDetails;