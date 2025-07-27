"use client";

import { useCart } from "@/hooks/useCart";
import { useUpdateCartQuantity } from "@/hooks/useUpdateCartQuantity";
import { useRemoveFromCart } from "@/hooks/useRemoveFromCart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CartDrawer = ({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (value: boolean) => void;
}) => {
    const { data: cart = [], isLoading } = useCart();
    const { mutate: updateQuantity, isPending: updating } = useUpdateCartQuantity();
    const { mutate: removeFromCart, isPending: removing } = useRemoveFromCart();

    const handleIncrease = (productId: string, currentQty: number) => {
        updateQuantity({ productId, quantity: currentQty + 1 });
    };

    const handleDecrease = (productId: string, currentQty: number) => {
        if (currentQty > 1) {
            updateQuantity({ productId, quantity: currentQty - 1 });
        }
    };

    const handleRemove = (productId: string) => {
        removeFromCart({ productId });
    };

    const subtotal = cart.reduce(
        (acc: number, item: any) =>
            acc + (item.productId?.final_price || 0) * item.quantity,
        0
    );

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:w-[400px] font-playfairdisplay">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
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
                                    <p className="text-sm text-gray-500 mb-1">
                                        Rs. {item.productId.final_price} × {item.quantity}
                                    </p>
                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="border px-2 py-1 rounded"
                                            onClick={() => handleDecrease(item.productId._id, item.quantity)}
                                            disabled={updating || item.quantity <= 1}
                                        >
                                            −
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="border px-2 py-1 rounded"
                                            onClick={() => handleIncrease(item.productId._id, item.quantity)}
                                            disabled={updating}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="text-red-500 text-sm mt-1"
                                        onClick={() => handleRemove(item.productId._id)}
                                        disabled={removing}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Subtotal + Go to Cart */}
                {cart.length > 0 && (
                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>Rs. {subtotal.toLocaleString()}</span>
                        </div>
                        <Link href="/cart">
                            <button
                                className="mt-4 w-full bg-pink-400 hover:bg-pink-500 text-white py-2 px-4 rounded"
                                onClick={() => onOpenChange(false)}
                            >
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
