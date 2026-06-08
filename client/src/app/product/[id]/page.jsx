"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { addToCart } from "@/services/cartservice";
import { getProductById } from "@/services/productService";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function DetailSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid md:grid-cols-2 gap-10 animate-pulse">
                <div className="space-y-4">
                    <div className="h-[480px] bg-slate-100 rounded-2xl" />
                    <div className="flex gap-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-20 h-20 bg-slate-100 rounded-xl" />
                        ))}
                    </div>
                </div>
                <div className="space-y-4 pt-2">
                    <div className="h-8 bg-slate-100 rounded-xl w-3/4" />
                    <div className="h-7 bg-slate-100 rounded-xl w-1/4" />
                    <div className="space-y-2 mt-4">
                        <div className="h-4 bg-slate-100 rounded w-full" />
                        <div className="h-4 bg-slate-100 rounded w-5/6" />
                        <div className="h-4 bg-slate-100 rounded w-4/5" />
                    </div>
                    <div className="h-12 bg-slate-100 rounded-xl w-48 mt-6" />
                </div>
            </div>
        </div>
    );
}

export default function ProductDetailsPage() {
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState("");
    const [product, setProduct] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);
    const [added, setAdded] = useState(false);

    const { id } = useParams();
    const router = useRouter();

    const fetchProduct = async () => {
        try {
            const data = await getProductById(id);
            setProduct(data.product);
            setSelectedImage(data.product.images[0]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            setAddingToCart(true);
            await addToCart(product._id);
            setAdded(true);
            toast.success("Added to cart");
            setTimeout(() => setAdded(false), 2000);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add item");
        } finally {
            setAddingToCart(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
                <Navbar />

                {loading ? (
                    <DetailSkeleton />
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-7xl mx-auto px-6 py-8"
                    >
                        {/* Breadcrumb */}
                        <motion.div
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35 }}
                            className="flex items-center gap-2 text-sm text-slate-400 mb-6"
                        >
                            <button
                                onClick={() => router.push("/products")}
                                className="hover:text-blue-500 transition-colors duration-150"
                            >
                                Products
                            </button>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-slate-600 truncate max-w-xs">{product.name}</span>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-10">
                            {/* Images */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Main image */}
                                <div className="rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={selectedImage}
                                            src={selectedImage}
                                            alt={product.name}
                                            initial={{ opacity: 0, scale: 1.03 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="w-full h-[460px] object-contain"
                                        />
                                    </AnimatePresence>
                                </div>

                                {/* Thumbnails */}
                                {product.images.length > 1 && (
                                    <div className="flex gap-3 mt-4">
                                        {product.images.map((image, index) => (
                                            <motion.button
                                                key={index}
                                                whileHover={{ scale: 1.06, y: -2 }}
                                                whileTap={{ scale: 0.94 }}
                                                onClick={() => setSelectedImage(image)}
                                                className={`relative rounded-xl overflow-hidden border-2 transition-all duration-200 ${selectedImage === image
                                                        ? "border-blue-500 shadow-md shadow-blue-100"
                                                        : "border-transparent hover:border-slate-300"
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt=""
                                                    className="w-20 h-20 object-contain"
                                                />
                                                {selectedImage === image && (
                                                    <motion.div
                                                        layoutId="thumb-indicator"
                                                        className="absolute inset-0 bg-blue-500/10"
                                                    />
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>
                                )}
                            </motion.div>

                            {/* Details */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                                className="flex flex-col"
                            >
                                <h1 className="text-3xl font-bold text-slate-800 tracking-tight leading-tight">
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-3 mt-3 mb-6">
                                    <span className="text-2xl font-bold text-slate-900">
                                        ₹{product.price.toLocaleString("en-IN")}
                                    </span>
                                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                                        In Stock
                                    </span>
                                </div>

                                <div className="border-t border-slate-100 pt-5 mb-8">
                                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">
                                        Description
                                    </p>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                                    <motion.button
                                        onClick={handleAddToCart}
                                        disabled={addingToCart}
                                        whileHover={{ scale: addingToCart ? 1 : 1.03, y: addingToCart ? 0 : -1 }}
                                        whileTap={{ scale: addingToCart ? 1 : 0.97 }}
                                        className={`flex-1 py-3.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all duration-200 flex items-center justify-center gap-2 ${added
                                                ? "bg-emerald-500 shadow-emerald-200"
                                                : addingToCart
                                                    ? "bg-blue-400 cursor-not-allowed shadow-blue-100"
                                                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-200"
                                            }`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {added ? (
                                                <motion.span
                                                    key="added"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Added to Cart!
                                                </motion.span>
                                            ) : addingToCart ? (
                                                <motion.span
                                                    key="adding"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    Adding...
                                                </motion.span>
                                            ) : (
                                                <motion.span
                                                    key="idle"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    Add to Cart
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.03, y: -1 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => router.push("/cart")}
                                        className="sm:w-auto px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        View Cart
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </div>
        </ProtectedRoute>
    );
}