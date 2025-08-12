"use client";

import { Product } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type ProductProps = {
  _id: string,
  name: string,
  slug?: string,        // Make optional
  final_price: number,
  price: number,
  images: string[],
  discount?: number
}

export default function ProductCard({ data: product, collectionSlug, subcollectionSlug }: {
  data: ProductProps; collectionSlug?: string;
  subcollectionSlug?: string;
}) {

  const pathname = usePathname();
  const currentPath = pathname.split('/').pop();
  let productUrl = `/collections/${collectionSlug}`;
  if (subcollectionSlug) {
    productUrl += `/${subcollectionSlug}`;
  }
  productUrl += `/${product.slug}`;

  return (
    <div className="border border-secondary rounded-lg relative">
      <div className="p-4">
        <Image src={product.images[0]} className="h-[274px] w-full rounded-lg" height={100} width={230} alt={product.name} />
        <h3 className="capitalize font-semibold font-playfairdisplay text-xl my-4">
          {/* <Link href={`/collections/${collectionSlug}/${subcollectionSlug}/${product.slug}`}> */}
          <Link href={productUrl}>
            {product.name}
          </Link>
        </h3>
        <div className="flex justify-between items-center">
          <p>Price : <span className="font-playfairdisplay">Rs {product.final_price.toLocaleString()}</span> <span className="font-extralight line-through font-playfairdisplay">Rs {product.price.toLocaleString()}</span></p>
          <div className="inline-flex gap-3 items-center">
            <span>
              <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6886 15.327C12.6886 15.9784 11.9419 16.3472 11.4247 15.9514L7.66333 13.0731C7.38138 12.8573 6.9898 12.8573 6.70784 13.0731L2.9465 15.9514C2.42925 16.3472 1.68262 15.9784 1.68262 15.327V3.4432C1.68262 2.99647 1.84827 2.56803 2.14313 2.25214C2.43799 1.93625 2.8379 1.75879 3.25489 1.75879H11.1163C11.5333 1.75879 11.9332 1.93625 12.228 2.25214C12.5229 2.56803 12.6886 2.99647 12.6886 3.4432V15.327Z" stroke="#805387" strokeWidth="1.57228" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.33091 0.916992C4.7256 0.916992 3.22125 1.7002 2.3006 3.01527V3.01527C1.72167 3.84225 1.41113 4.82729 1.41113 5.83677V16.0767C1.41113 16.5235 1.57678 16.9519 1.87164 17.2678C2.1665 17.5837 2.56642 17.7611 2.98341 17.7611H13.9894C14.4063 17.7611 14.8063 17.5837 15.1011 17.2678C15.396 16.9519 15.5616 16.5235 15.5616 16.0767V5.83677C15.5616 4.82729 15.2511 3.84225 14.6722 3.01527V3.01527C13.7515 1.7002 12.2472 0.916992 10.6418 0.916992H6.33091Z" stroke="#805387" strokeWidth="1.57228" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.41113 4.28613H15.5616" stroke="#805387" strokeWidth="1.57228" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.6309 7.6543C11.6309 8.54777 11.2996 9.40464 10.7099 10.0364C10.1202 10.6682 9.32034 11.0231 8.48635 11.0231C7.65236 11.0231 6.85253 10.6682 6.26282 10.0364C5.6731 9.40464 5.3418 8.54777 5.3418 7.6543" stroke="#805387" strokeWidth="1.57228" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-4 -right-[16px]">
        <svg width="82" height="35" viewBox="0 0 82 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_3540_3667)">
            <path d="M62.6318 7.52734H81.8702L73.8504 19.9357L81.8702 32.3461H62.6318V7.52734Z" fill="#5FA34B" />
            <path d="M70.8239 28.2492L62.6152 32.3466V7.24219H70.8239V28.2492Z" fill="#305524" />
            <path d="M69.2524 5.11719H13.2578C12.3895 5.11719 11.6855 5.82112 11.6855 6.68946V26.6769C11.6855 27.5452 12.3895 28.2491 13.2578 28.2491H69.2524C70.1207 28.2491 70.8246 27.5452 70.8246 26.6769V6.68946C70.8246 5.82112 70.1207 5.11719 69.2524 5.11719Z" fill="#83C071" />
          </g>
          <text x="50%" y="50%" fill="white" fontSize="12" className="font-playfairdisplay" fontWeight="bold" textAnchor="middle"
            dominantBaseline="middle">
            {product.discount} % Off
          </text>
          <defs>
            <clipPath id="clip0_3540_3667">
              <rect width="80.9723" height="31.4455" fill="white" transform="translate(0.898438 0.900391)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}
