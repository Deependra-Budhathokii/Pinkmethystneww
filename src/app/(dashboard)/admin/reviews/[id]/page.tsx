"use client"

import { StarRating } from '@/components/admin/StartRating'
import LoadingSpinner from '@/components/loader/loading'
import { useReview } from '@/hooks/use-reviews'
import Image from 'next/image'
import React from 'react'
// import { StarRating } from '../../product-stock/[productId]/page'

const page = ({ params }: { params: Promise<{ id: string }> }) => {

    const unwrappedParams = React.use(params);
    const { id } = unwrappedParams;

    const { data, isLoading, error } = useReview(id)


    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error loading Review</div>;
    }


    return (
        <div className='font-playfairdisplay' >
            <h2 className='text-3xl font-bold mb-10'>Review</h2>
            {/* Personal Details */}
            <div className="flex gap-8 md:gap-16 items-center flex-wrap">
                <div className="flex flex-col gap-4">
                    <Image src={data && data.user.image ? data.user.image : "https://picsum.photos/id/177/200"} className="rounded-full object-cover h-[134px]" height={134} width={134} alt='Profile' />
                </div>
                {/* Customer Info */}
                <div className="flex flex-col gap-4">
                    <span className='font-medium'>Id : {id}</span>
                    <div className="flex gap-4 md:gap-14 flex-wrap ">
                        <span className='font-medium'>
                            <p>Name : {data && data.user.name}</p>
                        </span>
                        <span className='font-medium'>
                            <p>Address : {data && data.user.address.province}, {data && data.user.address.district}, {data && data.user.address.street}, {data && data.user.address.landmark}</p>
                        </span>
                    </div>
                    <div className="flex gap-4 md:gap-14 flex-wrap ">
                        <span className='font-medium'>
                            <p>Phone No : {data && data.user.phone}</p>
                        </span>
                        <span className='font-medium'>
                            <p>Email : {data && data.user.email}</p>
                        </span>
                    </div>
                </div>
            </div>
            {/* Product Details */}
            <div className="mt-10 flex gap-14 flex-wrap">
                {/* Image */}
                <Image src={data && data.product.images ? data.product.images[0] : "https://picsum.photos/id/64/4326/2884.jpg"} className='rounded-md object-cover' height={300} width={335} alt='Product Image' />
                {/* Product Content */}
                <div className="flex flex-col gap-6">
                    <h4 className='text-3xl font-semibold'>{data && data.product.name}</h4>
                    <div className="flex gap-16 items-center">
                        <span className='text-2xl font-semibold' >Rs. {data && data.product.price}</span>
                        <div className="inline-flex gap-2 items-center">
                            <StarRating rating={data?.product.rating_avg ?? 0} />
                            <span className='text-[14px] text-[#727172]' >Average Ratings</span>
                        </div>
                    </div>
                    {/* Colors */}
                    <div>
                        <span>
                            Available Colors
                        </span>
                        <div className="flex gap-4 mt-3 flex-wrap">
                            {
                                data && data.product.color.map((color) => (
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
                                data && data.product.size.map((size) => (
                                    <div key={size} className={`rounded-md border py-2 px-4`}>{size}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-6">
                <span className='text-2xl font-bold'>Reviews</span>
                <div className="bg-white p-2 mt-4">
                    <p>{data && data.review}</p>
                </div>
            </div>
        </div>
    )
}

export default page