"use client"
import { Star, StarHalf, StarOff } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense, useState } from 'react'
import chartSize from "@/../public/size/sizeChart.png"
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { useParams } from 'next/navigation';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useProduct, useProducts } from '@/hooks/use-products';
import LoadingSpinner from '@/components/loader/loading';
import { useReviews } from '@/hooks/use-reviews';



const page = ({ params }: { params: { productId: string } }) => {
    const { productId } = params;
    const swiperRef = React.useRef<any>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

    // Products Data
    const { data: products, isLoading, error } = useProduct(productId);
    console.log("productssss", products);
    const { data: allreviews } = useReviews()
    const reviews = allreviews?.filter((review) => review.product._id === productId).map((review) => ({
        id: review._id,
        review: review.review,
        userPhoto: review.user.image,
        rating: review.rating,
        userName: review.user.name,
    })).slice(0, 4);

    React.useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error loading product</div>;
    }

    return (
        <div className='font-playfairdisplay' >
            {/* Product Details */}
            <div className="mt-10 flex gap-8 flex-wrap lg:flex-nowrap">
                {/* Image */}
                <div className="w-full lg:w-[35%]">
                    <Swiper
                        spaceBetween={10}
                        navigation={{
                            prevEl: '.custom-prev-button',
                            nextEl: '.custom-next-button',
                        }}
                        loop={true}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2 text-white max-h-[400px] lg:max-h-[500px] [--swiper-navigation-color:text-white] [--swiper-pagination-color:text-white] "
                    >
                        {products && products.images.map((image, idx) => (
                            <SwiperSlide key={idx} >
                                <Image src={image} width={500} height={300} quality={100} style={{ height: "450px", width: "500px", objectFit: "cover" }} alt='Product Image' />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="flex gap-8 my-4 justify-center">
                        {/* Custom Navigation Buttons */}
                        <button
                            className="custom-prev-button py-4 px-5 inline-block  text-white border-secondary border rounded-lg"
                            onClick={() => swiperRef.current?.slidePrev()}
                        >
                            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.94775 9.72327L0.947754 5.55792L4.94775 1.39258" stroke="#805387" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </button>
                        <button
                            className="custom-next-button py-4 px-5 inline-block  text-white border-secondary border rounded-lg"
                            onClick={() => swiperRef.current?.slideNext()}
                        >
                            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.947754 9.72327L4.94775 5.55792L0.947754 1.39258" stroke="#805387" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </button>
                    </div>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper cursor-pointer mt-1 pb-2"
                    >
                        {products && products.images.map((image, idx) => (
                            <SwiperSlide key={idx} >
                                <Image src={image} width={120} height={100} style={{ height: "100px", }} alt='Product Image' />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* Product Content */}
                <div className="flex flex-col gap-4">
                    <h4 className='text-3xl font-semibold'>{products?.name}</h4>
                    <div className="flex gap-4 sm:gap-16 items-center flex-wrap">
                        <span className='text-2xl font-semibold' >Rs. {products?.final_price}</span>
                        <div className="md:ml-auto">
                            <div className="inline-flex mr-2">
                                <StarRating rating={products?.rating_avg ?? 0} />
                            </div>
                            {/* <span>221 Reviews</span> */}
                        </div>
                    </div>
                    {/* Colors */}
                    <div>
                        <span>
                            Available Colors
                        </span>
                        <div className="flex gap-4 mt-3 flex-wrap">
                            {
                                products && products.color.map((color) => (
                                    <div key={color} className={`rounded-md h-8 w-12`} style={{ background: color }} ></div>
                                ))
                            }
                        </div>
                    </div>
                    {/* Sizes */}
                    <div>
                        <span>
                            Available Sizes
                        </span>
                        <div className="flex gap-4 mt-3 flex-wrap">
                            {
                                products && products.size.map((size) => (
                                    <div key={size} className={`rounded-md border py-2 px-4`}>{size}</div>
                                ))
                            }
                        </div>
                    </div>
                    {/* Quantity */}
                    <div>
                        <span>
                            Quantity :
                        </span>
                        <input className='ml-2 p-2 w-20 focus:outline-none border rounded-md' min={1} disabled defaultValue={products && products.quantity} type="number" name="" id="" />
                    </div>
                    {/* Size Chart */}
                    <div className='flex gap-3'>
                        <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.2519 16.7273H20.2634L20.2823 16.7269L20.2668 16.7441L20.2519 16.7273ZM6.60081 1.36544V21.8197H2.53938C2.16112 21.8197 1.81666 21.6656 1.56713 21.4178C1.31662 21.1716 1.16154 20.8307 1.16154 20.4549V2.73076C1.16154 2.35594 1.31662 2.01411 1.56664 1.76686C1.81616 1.51911 2.16062 1.36544 2.53938 1.36544H6.60081ZM7.59194 21.8197V1.36544H23.2497C23.6284 1.36544 23.9734 1.51911 24.2229 1.76636C24.4724 2.01362 24.6275 2.35545 24.6275 2.73076V20.4549C24.6275 20.8292 24.4724 21.1706 24.2224 21.4183C23.9729 21.6661 23.6279 21.8197 23.2497 21.8197H7.59194ZM9.81875 18.832H9.48274C9.13281 17.7582 9.04285 17.7164 9.15121 16.9066C9.41464 14.933 11.1901 13.9253 11.0733 12.6954C10.9391 11.2838 10.3079 10.8493 9.99023 9.65296C9.82471 9.02891 9.38432 7.23901 9.7427 6.68293C9.96836 6.33224 10.4684 6.25589 10.8486 6.08399C12.1022 5.51954 12.4884 4.93292 12.3771 3.85967H14.0527C13.9413 4.93292 14.327 5.51954 15.5806 6.08399C15.9619 6.25589 16.4614 6.33224 16.6876 6.68293C17.0454 7.23901 16.605 9.02891 16.439 9.65296C16.1214 10.8493 15.4911 11.2838 15.3564 12.6954C15.2396 13.9253 17.0146 14.933 17.2786 16.9066C17.3869 17.7164 17.2974 17.7582 16.947 18.832H16.5911V19.1314C16.5911 19.2383 16.5027 19.3255 16.3948 19.3255H10.0146C9.90723 19.3255 9.81875 19.2383 9.81875 19.1314V18.832ZM23.2497 0.382812H2.53938C1.88774 0.382812 1.29475 0.6478 0.865791 1.07237C0.436832 1.49793 0.169914 2.08553 0.169914 2.73076V20.4549C0.169914 21.0982 0.43733 21.6858 0.866785 22.1113C1.29574 22.5379 1.88824 22.8024 2.53938 22.8024H23.2497C23.9008 22.8024 24.4938 22.5379 24.9233 22.1128C25.3517 21.6877 25.6191 21.1001 25.6191 20.4549V2.73076C25.6191 2.08504 25.3522 1.49744 24.9233 1.07237C24.4943 0.647308 23.9013 0.382812 23.2497 0.382812ZM6.29612 2.5564H3.16815V3.32822H6.29612V2.5564ZM6.29612 4.4788H4.48634V5.25061H6.29612V4.4788ZM6.29612 19.8565H4.48634V20.6283H6.29612V19.8565ZM6.29612 17.9346H3.16815V18.7069H6.29612V17.9346ZM6.29612 16.0122H4.48634V16.784H6.29612V16.0122ZM6.29612 14.0898H3.16815V14.8621H6.29612V14.0898ZM6.29612 12.1684H4.48634V12.9402H6.29612V12.1684ZM6.29612 10.2455H3.16815V11.0173H6.29612V10.2455ZM6.29612 8.32309H4.48634V9.09491H6.29612V8.32309ZM6.29612 6.4007H3.16815V7.17251H6.29612V6.4007ZM18.9815 4.11776C18.7618 4.11776 18.5838 4.29409 18.5838 4.5118C18.5838 4.72901 18.7618 4.90583 18.9815 4.90583H21.5453C21.7645 4.90583 21.9424 4.72901 21.9424 4.5118C21.9424 4.29409 21.7645 4.11776 21.5453 4.11776H18.9815ZM18.9815 18.2803C18.7618 18.2803 18.5838 18.4567 18.5838 18.6744C18.5838 18.8916 18.7618 19.0679 18.9815 19.0679H21.5453C21.7645 19.0679 21.9424 18.8916 21.9424 18.6744C21.9424 18.4567 21.7645 18.2803 21.5453 18.2803H18.9815ZM18.9427 6.7967C18.7995 6.96072 18.8179 7.20896 18.9835 7.35081C19.1485 7.49267 19.399 7.47444 19.5421 7.31092L19.8657 6.94053V16.285L19.5421 15.9147C19.399 15.7506 19.1485 15.7329 18.9835 15.8748C18.8179 16.0166 18.7995 16.2644 18.9427 16.4289L19.9636 17.5967C20.1068 17.7607 20.3573 17.7784 20.5228 17.6366L20.5591 17.6011L21.5806 16.4643C21.7262 16.3023 21.7118 16.0535 21.5483 15.9092C21.3847 15.7644 21.1337 15.7792 20.9876 15.9412L20.6605 16.3052V6.91935L20.9876 7.28334C21.1337 7.44587 21.3847 7.46016 21.5483 7.31584C21.7118 7.17153 21.7262 6.92279 21.5806 6.76075L20.5601 5.62347L20.5228 5.5885C20.3573 5.44664 20.1068 5.46438 19.9636 5.62839L18.9427 6.7967ZM20.2166 6.53861L20.2668 6.48098L20.3195 6.54009C20.3011 6.53763 20.2828 6.53566 20.2634 6.53566L20.2166 6.53861Z" fill="black" />
                        </svg>
                        <span>
                            Size Chart :
                        </span>
                    </div>
                    <Image src={chartSize} height={0} width={0} style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }} alt='Size Chart' />
                </div>
            </div>
            {/* Product Description */}
            <div className="my-6">
                <span className='text-2xl font-bold'>Product Description</span>
                <div className="mt-4">
                    <p>{products && products.description}</p>
                </div>
            </div>
            {/* Product Feature */}
            <div className="my-6">
                <span className='text-xl font-bold'>Features</span>
                <div className="mt-4">
                    {products && products.features.map((feature) => (
                        <li key={feature._id} >{feature.name} : {feature.value}</li>
                    ))}
                </div>
            </div>
            {/* Customers Reviews Card */}
            <div className="my-8">
                <div className="flex justify-between">
                    <span className='text-2xl font-bold'>Customer Reviews</span>
                    <Link href={`/admin/reviews/`} className='underline text-secondary'>View All Reviews</Link>

                </div>
                <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(2,minmax(200px,1fr))] gap-6">
                    {
                        reviews && reviews.length === 0 ? (<span className='italic'>Reviews Not Added For This Product</span>) : (
                            reviews && reviews.map((review) => (
                                <div key={review.id} className="flex gap-4 p-2 border-secondary border rounded-md items-center flex-wrap justify-center lg:flex-nowrap lg:justify-normal">
                                    <div className="flex flex-col justify-center items-center min-w-[20%]">
                                        {/* Reviewer Image */}
                                        <Image src={review.userPhoto ? review.userPhoto : "https://picsum.photos/id/64/4326/2884.jpg"} className='rounded-full object-cover' height={48} width={48} style={{ height: "50px", width: "50px" }} alt='Reviewer Image' />
                                        {/* Reviewer Name */}
                                        <span className='font-semibold text-[14px] text-center mb-2 leading-tight'>{review.userName}</span>
                                        {/* Starts */}
                                        <StarRating rating={review.rating} />
                                    </div>
                                    {/* Review */}
                                    <p>
                                        {review.review.slice(0, 250) + "..."}
                                    </p>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating); // Count of full stars
    const totalStars = 5; // Total number of stars

    return (
        <div className="flex">
            {/* Render stars */}
            {Array.from({ length: totalStars }).map((_, index) => {
                if (index < fullStars) {
                    // Full stars
                    return (
                        <Star
                            key={`full-${index}`}
                            height={12}
                            width={12}
                            className="text-yellow-500"
                            fill="currentColor"
                        />
                    );
                }
                // Empty stars
                return (
                    <StarOff
                        key={`empty-${index}`}
                        height={12}
                        width={12}
                        className="text-gray-400"
                    />
                );
            })}
        </div>
    );
};


export default page