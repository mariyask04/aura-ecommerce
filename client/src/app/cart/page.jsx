"use client";

import CartItem from "@/components/CartItem";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getCartItems, removeCartItem, updateCartItem } from "@/services/cartservice";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CartSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-4 animate-pulse">
            <div className="w-24 h-24 rounded-xl bg-slate-100 flex-shrink-0" />
            <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
                <div className="h-4 bg-slate-100 rounded-lg w-1/3" />
                <div className="h-7 bg-slate-100 rounded-xl w-28 mt-3" />
            </div>
        </div>
    );
}

export default function CartPage() {
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [checkingOut, setCheckingOut] = useState(false);

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
            toast.error("Failed to update quantity");
        }
    };

    const handleRemove = async (id) => {
        try {
            await removeCartItem(id);
            await fetchCart();
            toast.success("Item removed");
        } catch (error) {
            toast.error("Failed to remove item");
        }
    };

    const handleCheckout = () => {
        setCheckingOut(true);
        setTimeout(() => router.push("/checkout"), 400);
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
                <Navbar />

                <div className="max-w-5xl mx-auto px-6 py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Shopping Cart</h1>
                        <p className="text-slate-400 text-sm mt-1">
                            {loading ? "Loading..." : `${cartItems.length} item${cartItems.length !== 1 ? "s" : ""}`}
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-4">
                                {[1, 2, 3].map((i) => <CartSkeleton key={i} />)}
                            </div>
                            <div className="h-48 bg-white rounded-2xl border border-slate-100 animate-pulse" />
                        </div>
                    ) : !cartItems.length ? (
                        /* Empty State */
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center justify-center py-28 text-center"
                        >
                            <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-5">
                                <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <p className="text-slate-600 font-semibold text-lg">Your cart is empty</p>
                            <p className="text-slate-400 text-sm mt-1 mb-6">Add some products to get started</p>
                            <motion.button
                                whileHover={{ scale: 1.04, y: -1 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => router.push("/products")}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-blue-100 hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                            >
                                Browse Products
                            </motion.button>
                        </motion.div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-6 items-start">
                            {/* Items */}
                            <motion.div
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.05 }}
                                className="lg:col-span-2 space-y-3"
                            >
                                <AnimatePresence>
                                    {cartItems.map((item) => (
                                        <CartItem
                                            key={item._id}
                                            item={item}
                                            onQuantityChange={handleQuantityChange}
                                            onRemove={handleRemove}
                                        />
                                    ))}
                                </AnimatePresence>
                            </motion.div>

                            {/* Summary */}
                            <motion.div
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="sticky top-24"
                            >
                                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                                        Order Summary
                                    </h2>

                                    <div className="space-y-2.5 mb-4">
                                        <div className="flex justify-between text-sm text-slate-600">
                                            <span>Subtotal ({cartItems.length} items)</span>
                                            <span className="font-medium text-slate-800">₹{total.toLocaleString("en-IN")}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-slate-600">
                                            <span>Delivery</span>
                                            <span className="text-emerald-600 font-medium">Free</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-100 pt-4 mb-5">
                                        <div className="flex justify-between items-baseline">
                                            <span className="font-bold text-slate-800">Total</span>
                                            <motion.span
                                                key={total}
                                                initial={{ scale: 1.08, color: "#3b82f6" }}
                                                animate={{ scale: 1, color: "#0f172a" }}
                                                transition={{ duration: 0.3 }}
                                                className="text-xl font-bold text-slate-900"
                                            >
                                                ₹{total.toLocaleString("en-IN")}
                                            </motion.span>
                                        </div>
                                    </div>

                                    <motion.button
                                        onClick={handleCheckout}
                                        disabled={checkingOut}
                                        whileHover={{ scale: checkingOut ? 1 : 1.02, y: checkingOut ? 0 : -1 }}
                                        whileTap={{ scale: checkingOut ? 1 : 0.97 }}
                                        className={`w-full py-3 rounded-xl text-sm font-semibold text-white shadow-md transition-all duration-200 flex items-center justify-center gap-2 ${checkingOut
                                                ? "bg-slate-400 cursor-not-allowed shadow-slate-200"
                                                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-200"
                                            }`}
                                    >
                                        {checkingOut ? (
                                            <>
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Redirecting...
                                            </>
                                        ) : (
                                            <>
                                                Proceed to Checkout
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </>
                                        )}
                                    </motion.button>

                                    <button
                                        onClick={() => router.push("/products")}
                                        className="w-full mt-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all duration-150"
                                    >
                                        ← Continue Shopping
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}