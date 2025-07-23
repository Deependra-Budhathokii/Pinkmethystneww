"use client";

import { useProducts } from '@/hooks/use-products';
import React from 'react'
import ProductCard from '../ProductCard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


const StockClearance = () => {

    const { data: products, isError, isFetching } = useProducts();
    const stockClearanceProducts = products?.filter(product => product.isInStockClearance)

    if (isFetching)
        return (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4 md:gap-8 lg:gap-12">
                {[...Array(4)].map((_, index) => (
                    <Card key={index} className="overflow-hidden border">
                        <CardHeader>
                            <Skeleton className="h-4 w-2/3 " />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-48 w-full rounded-lg bg-primary/25" />{" "}
                            {/* Image skeleton */}
                            <Skeleton className="h-4 w-1/2 bg-primary/20" />{" "}
                            {/* Title skeleton */}
                            <Skeleton className="h-4 w-full bg-primary/55" />{" "}
                            {/* Description skeleton */}
                            <Skeleton className="h-4 w-3/4 bg-primary/55" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        )

    if (isError)
        return (
            <span className='text-red-400'>Error While Loading Products</span>
        )

    if (stockClearanceProducts?.length === 0)
        return (
            <span className='text-red-400'>Comming Soon..</span>
        )


    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] lg:grid-cols-[repeat(2,minmax(270px,1fr))] xl:grid-cols-[repeat(4,minmax(270px,1fr))] gap-4 md:gap-8 lg:gap-12">
            {stockClearanceProducts && stockClearanceProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} data={product} />
            ))}
        </div>
    )
}

export default StockClearance