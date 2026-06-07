"use client";

import CartItem from '@/components/CartItem';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getCartItems, removeCartItem, updateCartItem } from '@/services/cartservice';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function CartPage() {
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const router = useRouter();

    const fetchCart = async () => {
        try {
            const data = await getCartItems();

            setCartItems(data.cartItems);
            setTotal(data.total);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load cart");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleQuantityChange = async (item, quantity) => {
        if (quantity < 1) return;
        try {
            await updateCartItem(item._id, quantity);
            await fetchCart();
        } catch (error) {
            toast.error(
                "Failed to update quantity"
            );
        }
    }

    const handleRemove = async (id) => {
        try {
            await removeCartItem(id);
            await fetchCart();
            toast.success(
                "Item removed"
            );
        } catch (error) {
            toast.error(
                "Failed to remove item"
            );
        }
    }

    if (loading) {
        return (
            <ProtectedRoute>
                <Navbar />
                <div className="p-8">
                    Loading...
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <Navbar />

            <div className="max-w-6xl mx-auto p-6">

                <h1 className="text-3xl font-bold mb-6">
                    Shopping Cart
                </h1>

                {!cartItems.length ? (
                    <div>
                        Cart is empty
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            <AnimatePresence>
                                {cartItems.map(
                                    (
                                        item
                                    ) => (
                                        <CartItem
                                            key={
                                                item._id
                                            }
                                            item={
                                                item
                                            }
                                            onQuantityChange={
                                                handleQuantityChange
                                            }
                                            onRemove={
                                                handleRemove
                                            }
                                        />
                                    )
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="mt-8 bg-white shadow rounded-lg p-6">

                            <h2 className="text-2xl font-semibold mb-4">
                                Total:
                                ₹
                                {total}
                            </h2>

                            <button
                                onClick={() =>
                                    router.push(
                                        "/checkout"
                                    )
                                }
                                className="bg-black text-white px-6 py-3 rounded hover:scale-105 transition"
                            >
                                Proceed To Checkout
                            </button>

                        </div>
                    </>
                )}
            </div>
        </ProtectedRoute>
    );
}