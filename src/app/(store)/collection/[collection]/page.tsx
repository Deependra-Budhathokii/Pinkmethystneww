"use client"

import ProductCard from '@/components/client/ProductCard'
import SectionTop from '@/components/client/SectionTop'
import { useProducts } from '@/hooks/use-products';
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from 'react'


const page = () => {
    const { data: products, isError, isFetching } = useProducts();
    return (
        <div className='container font-wilkyasta bg-[#fdf6f8] p-8'>

            <div className='flex justify-between align-items-center'>
                <div>
                    <div className="mb-8 sm:mb-16" >
                        <h2 className="text-[40px] mb-4 max-w-fit relative  before:bg-[#2F2F2F] before:w-full before:bottom-1">Luxury <span className="text-[28px]">Collection</span></h2>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Filter Button */}
                    <Button className="rounded-full bg-[#e6aeb2] hover:bg-[#d7999d] text-white px-5">
                        Filter
                    </Button>

                    {/* Sort Button */}
                    <Button className="rounded-full bg-[#e6aeb2] hover:bg-[#d7999d] text-white px-5 flex items-center gap-1">
                        Sort <ChevronRight size={16} />
                    </Button>

                    {/* Search Input */}
                    <div className="relative">
                        <Input
                            placeholder="Search.."
                            className="pl-4 pr-10 rounded-full border border-gray-300 text-sm"
                        />
                        <Search className="absolute right-3 top-2.5 text-gray-500 w-4 h-4 pointer-events-none" />
                    </div>
                </div>

            </div>


            <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] lg:grid-cols-[repeat(2,minmax(270px,1fr))] xl:grid-cols-[repeat(4,minmax(270px,1fr))] gap-4 md:gap-8 lg:gap-12">
                {/* {products.map((product) => (
                    <ProductCard key={product._id} data={product} />
                ))} */}

                {products?.length ? (
                    products.map((product) => (
                        <ProductCard key={product._id} data={product} />
                    ))
                ) : isFetching ? (
                    <p>Loading products...</p>
                ) : isError ? (
                    <p className="text-red-500">Failed to load products.</p>
                ) : (
                    <p>No products found.</p>
                )}
            </div>

        </div>

    )
}

export default page