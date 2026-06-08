"use client";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getProducts } from "@/services/productService";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
            <div className="h-56 bg-slate-100" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
                <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
                <div className="h-9 bg-slate-100 rounded-xl mt-4" />
            </div>
        </div>
    );
}

export default function ProductsPage() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [focused, setFocused] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts(search);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [search]);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
                <Navbar />

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                            All Products
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            {loading ? "Loading..." : `${products.length} item${products.length !== 1 ? "s" : ""} available`}
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="mb-8"
                    >
                        <motion.div
                            animate={focused ? { scale: 1.01 } : { scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className={`relative rounded-2xl transition-all duration-200 ${focused ? "ring-2 ring-blue-400 ring-offset-2" : ""
                                }`}
                        >
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-800 placeholder-slate-300 text-sm outline-none shadow-sm hover:border-slate-300 transition-colors duration-200"
                            />
                            <AnimatePresence>
                                {search && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.15 }}
                                        onClick={() => setSearch("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>

                    {/* Grid */}
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="skeletons"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </motion.div>
                        ) : products.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="flex flex-col items-center justify-center py-24 text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <p className="text-slate-500 font-medium">No products found</p>
                                <p className="text-slate-400 text-sm mt-1">Try a different search term</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="products"
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0 }}
                                variants={{
                                    hidden: {},
                                    show: {
                                        transition: { staggerChildren: 0.07 },
                                    },
                                }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                {products.map((product) => (
                                    <motion.div
                                        key={product._id}
                                        variants={{
                                            hidden: { opacity: 0, y: 24, scale: 0.97 },
                                            show: {
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                                            },
                                        }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </ProtectedRoute>
    );
}