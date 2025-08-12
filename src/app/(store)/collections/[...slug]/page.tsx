"use client";

import { useProducts, useProd, useProductsByCollection, useProductsBySubCollection } from "@/hooks/use-products";
import ProductCard from "@/components/client/ProductCard";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/client/ProductDetails";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CollectionRouterPage({ params }: { params: { slug: string[] } }) {
    const slug = params.slug || [];


    // BY COLLECTION
    if (slug.length === 1) {
        // const collection = slug[0];
        const collectionSlug = slug[0];
        // const { data: products, isFetching, isError } = useProducts({ collection });
        const { data: products, isFetching, isError } = useProductsByCollection(collectionSlug);

        return (
            <div className="container p-6 font-wilkyastax`">

                <div className='flex justify-between mb-8 sm:mb-16'>
                    <div>
                        <h2 className="text-4xl  max-w-fit relative  before:bg-[#2F2F2F] before:w-full before:bottom-1 capitalize">{collectionSlug.replace("-", " ")} </h2>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products?.map((product: any) => (
                        <ProductCard key={product._id} data={product} collectionSlug={collectionSlug} />
                    ))}
                </div>
                {isFetching && <p>Loading...</p>}
                {isError && <p className="text-red-500">Error loading products.</p>}
            </div>
        );
    }




    // BY SUB COLLECTION

    // if (slug.length === 2) {
    //     const [collectionSlug, subcollectionSlug] = slug;

    //     const {
    //         data: products,
    //         isFetching,
    //         isError,
    //     } = useProductsBySubCollection({
    //         collectionSlug,
    //         subcollectionSlug,
    //     });


    if (slug.length === 2) {
        const [collectionSlug, secondSlug] = slug;

        // Try fetching product with secondSlug
        // const { data: product, isLoading, error } = useProd(secondSlug);

        // if (product) {
        //     return (
        //         <div className="container">
        //             <ProductDetails product={product} />
        //         </div>
        //     );
        // }

        // // If not product, treat secondSlug as subcollection
        // const {
        //     data: products,
        //     isFetching,
        //     isError,
        // } = useProductsBySubCollection({
        //     collectionSlug,
        //     subcollectionSlug: secondSlug,
        // });



        // Always call hooks
        const { data: product, isLoading: isProductLoading } = useProd(secondSlug);
        const {
            data: products,
            isFetching: isProductsFetching,
            isError: isProductsError,
        } = useProductsBySubCollection({
            collectionSlug,
            subcollectionSlug: secondSlug,
        });

        // If product exists, render it
        if (product) {
            return (
                <div className="container">
                    <ProductDetails product={product} />
                </div>
            );
        }

        return (
            <div className="container p-6 font-wilkyasta bg-[#fdf6f8]">

                <div className='flex justify-between mb-8 sm:mb-16'>
                    <div>
                        <h2 className="text-4xl  max-w-fit relative  before:bg-[#2F2F2F] before:w-full before:bottom-1 capitalize">{secondSlug.replace("-", " ")} </h2>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products?.map((product: any) => (
                        <ProductCard key={product._id} data={product} collectionSlug={collectionSlug}
                            subcollectionSlug={secondSlug} />
                    ))}
                </div>

                {isProductsFetching && <p>Loading...</p>}
                {isProductsError && <p className="text-red-500">Error loading product.</p>}
            </div>
        );
    }


    // BY PRODUCT
    if (slug.length >= 3) {

        const productSlug = slug[slug.length - 1];
        console.log("productslug", productSlug)

        const { data: product, isLoading, error } = useProd(productSlug);

        if (isLoading) return <p>Loading product...</p>;
        if (error || !product) return notFound();

        return (

            <div className="container">
                <ProductDetails product={product} />
            </div>
        );
    }

    return notFound();
}
