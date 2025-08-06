"use client";

import { useProducts, useProd, useProductsByCollection, useProductsBySubCollection } from "@/hooks/use-products";
import ProductCard from "@/components/client/ProductCard";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/client/ProductDetails";

export default function CollectionRouterPage({ params }: { params: { slug: string[] } }) {
    const slug = params.slug || [];

    // console.log("productData", slug)
    // Example paths:
    // /by-season → slug = ["by-season"]
    // /by-season/winter → slug = ["by-season", "winter"]
    // /by-season/winter/jacket-for-woman → slug = ["by-season", "winter", "jacket-for-woman"]

    if (slug.length === 1) {
        // const collection = slug[0];
        const collectionSlug = slug[0];
        // const { data: products, isFetching, isError } = useProducts({ collection });
        const { data: products, isFetching, isError } = useProductsByCollection(collectionSlug);

        return (
            <div className="container p-6">
                <h2 className="text-2xl font-bold capitalize mb-4">{collectionSlug} Collection</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products?.map((product) => (
                        <ProductCard key={product._id} data={product} />
                    ))}
                </div>
                {isFetching && <p>Loading...</p>}
                {isError && <p className="text-red-500">Error loading products.</p>}
            </div>
        );
    }

    if (slug.length === 2) {
        const [collectionSlug, subcollectionSlug] = slug;

        const {
            data: products,
            isFetching,
            isError,
        } = useProductsBySubCollection({
            collectionSlug,
            subcollectionSlug,
        });

        return (
            <div className="container p-6">
                <h2 className="text-2xl font-bold capitalize mb-4">
                    {subcollectionSlug.replace("-", " ")} in {collectionSlug.replace("-", " ")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products?.map((product) => (
                        <ProductCard key={product._id} data={product} collectionSlug={collectionSlug}
                            subcollectionSlug={subcollectionSlug} />
                    ))}
                </div>

                {isFetching && <p>Loading...</p>}
                {isError && <p className="text-red-500">Error loading product.</p>}
            </div>
        );
    }

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
