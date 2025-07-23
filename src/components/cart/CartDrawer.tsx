"use client";

import { useCart } from "@/hooks/useCart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { useCartDrawer } from "@/context/cartDrawerContext";

const CartDrawer = () => {
    const { isOpen, closeDrawer } = useCartDrawer();
    const { data: cart = [], isLoading } = useCart();

    const subtotal = cart.reduce(
        (acc: number, item: any) => acc + item.productId.final_price * item.quantity,
        0
    );

    return (
        <Sheet open={isOpen} onOpenChange={closeDrawer}>
            <SheetContent side="right" className="w-full sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : cart.length === 0 ? (
                        <p className="text-sm text-gray-500">Your cart is empty.</p>
                    ) : (
                        cart.map((item: any) => (
                            <div key={item.productId._id} className="flex gap-4 items-center">
                                <Image
                                    src={item.productId.images[0]}
                                    alt={item.productId.name}
                                    width={60}
                                    height={60}
                                    className="rounded object-cover"
                                />
                                <div className="flex-1">
                                    <p className="font-medium">{item.productId.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Rs. {item.productId.final_price} × {item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>Rs. {subtotal.toLocaleString()}</span>
                        </div>
                        <Link href="/cart" onClick={closeDrawer}>
                            <button className="mt-4 w-full bg-pink-400 hover:bg-pink-500 text-white py-2 px-4 rounded">
                                Go to Cart
                            </button>
                        </Link>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default CartDrawer;
