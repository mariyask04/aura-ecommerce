"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CartItem({ item, onQuantityChange, onRemove }) {
    const [removing, setRemoving] = useState(false);
    const [updating, setUpdating] = useState(false);

    const handleRemove = async () => {
        setRemoving(true);
        await onRemove(item._id);
    };

    const handleQuantity = async (newQty) => {
        if (newQty < 1) return;
        setUpdating(true);
        await onQuantityChange(item, newQty);
        setUpdating(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -24, scale: 0.98 }}
            animate={{ opacity: removing ? 0 : 1, x: 0, scale: removing ? 0.96 : 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm shadow-slate-100 p-4 flex gap-4 hover:border-slate-200 hover:shadow-md hover:shadow-slate-100 transition-all duration-200"
        >
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden bg-slate-50 flex-shrink-0">
                <img
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-contain"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2">
                    {item.product.name}
                </h2>
                <p className="text-base font-bold text-slate-900 mt-1">
                    ₹{item.product.price.toLocaleString("en-IN")}
                </p>

                {/* Subtotal */}
                <p className="text-xs text-slate-400 mt-0.5">
                    Subtotal: ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-3">
                    <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleQuantity(item.quantity - 1)}
                        disabled={item.quantity <= 1 || updating}
                        className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 font-bold text-sm flex items-center justify-center hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
                    >
                        −
                    </motion.button>

                    <AnimatePresence mode="wait">
                        <motion.span
                            key={item.quantity}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.15 }}
                            className="w-8 text-center text-sm font-semibold text-slate-800 tabular-nums"
                        >
                            {updating ? (
                                <span className="inline-block w-3 h-3 border-2 border-slate-300 border-t-blue-400 rounded-full animate-spin" />
                            ) : (
                                item.quantity
                            )}
                        </motion.span>
                    </AnimatePresence>

                    <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleQuantity(item.quantity + 1)}
                        disabled={updating}
                        className="w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 font-bold text-sm flex items-center justify-center hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150"
                    >
                        +
                    </motion.button>
                </div>
            </div>

            {/* Remove */}
            <div className="flex-shrink-0 flex items-start pt-0.5">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={handleRemove}
                    disabled={removing}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150 disabled:opacity-40"
                    aria-label="Remove item"
                >
                    {removing ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
}