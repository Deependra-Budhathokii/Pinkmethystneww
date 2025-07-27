"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useUpdateCartQuantity } from "@/hooks/useUpdateCartQuantity";
import { useRemoveFromCart } from "@/hooks/useRemoveFromCart";
import Link from "next/link";

const CartPage = () => {
    const { data: cart, isLoading, isError } = useCart();
    const { mutate: updateQuantity, isPending: updating } = useUpdateCartQuantity();
    const { mutate: removeFromCart, isPending: removing } = useRemoveFromCart();

    if (isLoading) return <div className="p-8">Loading cart...</div>;
    if (isError) return <div className="p-8">Failed to load cart</div>;

    const handleIncrease = (productId: string, currentQty: number) => {
        updateQuantity({ productId, quantity: currentQty + 1 });
    };

    const handleDecrease = (productId: string, currentQty: number) => {
        if (currentQty > 1) {
            updateQuantity({ productId, quantity: currentQty - 1 });
        }
    };

    const handleRemove = (productId: string) => {
        removeFromCart(productId);
        console.log("productId", productId)
    };

    const subtotal = cart.reduce(
        (acc: number, item: any) => acc + (item.productId?.final_price || 0) * item.quantity,
        0
    );

    return (
        <div className="container mx-auto py-12 font-playfairdisplay">
            <h1 className="text-3xl font-semibold mb-10">
                Your <span className="text-gray-500 font-normal">Cart</span>
            </h1>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="py-4">Product</th>
                            <th className="py-4">Quantity</th>
                            <th className="py-4">Amount per Unit</th>
                            <th className="py-4">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item: any) => (
                            <tr key={item.productId._id} className="border-b align-top">
                                <td className="py-6 flex gap-4 items-start">
                                    <Image
                                        src={item.productId.images?.[0] || "/placeholder.png"}
                                        alt={item.productId.name}
                                        width={80}
                                        height={80}
                                        className="rounded-md object-cover"
                                    />
                                    <div>
                                        <div className="font-medium">{item.productId.name}</div>
                                        <div className="text-sm text-gray-500">
                                            Rs. {item.productId.final_price?.toLocaleString()}
                                        </div>
                                        <button
                                            className="text-red-500 text-sm mt-1"
                                            onClick={() => handleRemove(item.productId._id)}
                                            disabled={removing}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </td>

                                <td className="py-6">
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="border px-2 py-1 rounded"
                                            onClick={() => handleIncrease(item.productId._id, item.quantity)}
                                            disabled={updating}
                                        >
                                            +
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="border px-2 py-1 rounded"
                                            onClick={() => handleDecrease(item.productId._id, item.quantity)}
                                            disabled={updating || item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                    </div>
                                </td>

                                <td className="py-6">
                                    Rs. {item.productId.final_price?.toLocaleString()}
                                </td>

                                <td className="py-6 font-medium">
                                    Rs. {(item.productId.final_price * item.quantity).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cart Total */}
            <div className="flex justify-end mt-10">
                <div className="w-full max-w-md text-right">
                    <hr className="mb-4" />
                    <div className="text-lg font-medium flex justify-between">
                        <span>Total</span>
                        <span className="text-red-600 font-bold">
                            Rs. {subtotal.toLocaleString()}
                        </span>
                    </div>
                    <Link href="/checkout">
                        <Button className="mt-6 w-full bg-[#e6aeb2] hover:bg-[#d7999d] text-white">

                        </Button>
                        Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
