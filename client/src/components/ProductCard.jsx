"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductCard({ product }) {
    const router = useRouter();
    const [imgLoaded, setImgLoaded] = useState(false);
    const [pressing, setPressing] = useState(false);

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="group bg-white rounded-2xl shadow-sm shadow-slate-100 border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 hover:border-slate-200 transition-shadow duration-300"
        >
            {/* Image */}
            <div className="relative overflow-hidden bg-slate-100 h-56">
                {!imgLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-slate-200 border-t-blue-400 rounded-full animate-spin" />
                    </div>
                )}
                <motion.img
                    src={product.images?.[0]}
                    alt={product.name}
                    onLoad={() => setImgLoaded(true)}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={imgLoaded ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4 }}
                    className="w-full h-56 object-contain group-hover:scale-108 transition-transform duration-500 ease-out"
                    style={{ transform: "scale(1)" }}
                />
                {/* Overlay badge */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                    <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm border border-white/60">
                        View
                    </span>
                </motion.div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h2 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 mb-1">
                    {product.name}
                </h2>

                <div className="flex items-center justify-between mt-2 mb-4">
                    <p className="text-lg font-bold text-slate-900">
                        ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                        In Stock
                    </span>
                </div>

                <motion.button
                    onClick={() => router.push(`/product/${product._id}`)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onMouseDown={() => setPressing(true)}
                    onMouseUp={() => setPressing(false)}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md shadow-blue-100 transition-all duration-200 relative overflow-hidden"
                >
                    <motion.span
                        animate={pressing ? { scale: 0.95 } : { scale: 1 }}
                        className="flex items-center justify-center gap-1.5"
                    >
                        View Details
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.span>
                </motion.button>
            </div>
        </motion.div>
    );
}