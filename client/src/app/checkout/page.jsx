"use client";

import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { placeOrder } from "@/services/orderService";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const errorVariants = {
    hidden: { opacity: 0, y: -6, height: 0 },
    visible: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.22 } },
    exit: { opacity: 0, y: -4, height: 0, transition: { duration: 0.18 } },
};

const shakeVariants = {
    shake: {
        x: [0, -8, 8, -6, 6, -4, 4, 0],
        transition: { duration: 0.5 },
    },
};

export default function CheckoutPage() {
    const [formData, setFormdata] = useState({
        customerName: "",
        address: "",
        mobile: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [shaking, setShaking] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const router = useRouter();

    const validate = () => {
        const newErrors = {};
        if (!formData.customerName.trim()) newErrors.customerName = "Name is required";
        if (!formData.address.trim()) newErrors.address = "Delivery address is required";
        if (!formData.mobile) newErrors.mobile = "Mobile number is required";
        else if (!/^[0-9]{10}$/.test(formData.mobile))
            newErrors.mobile = "Enter a valid 10-digit mobile number";
        return newErrors;
    };

    const handleChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setShaking(true);
            setTimeout(() => setShaking(false), 600);
            return;
        }
        try {
            setLoading(true);
            await placeOrder(formData);
            setSuccess(true);
            toast.success("Order placed successfully");
            setTimeout(() => router.push("/products"), 1000);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to place order");
            setShaking(true);
            setTimeout(() => setShaking(false), 600);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field) =>
        `w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50/50 text-slate-800 placeholder-slate-300 text-sm outline-none transition-all duration-200 hover:border-slate-300 ${focusedField === field
            ? "border-blue-300 ring-2 ring-blue-400 ring-offset-1"
            : errors[field]
                ? "border-red-200 ring-2 ring-red-300 ring-offset-1"
                : "border-slate-200"
        }`;

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
                <Navbar />

                <div className="max-w-2xl mx-auto px-6 py-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Checkout</h1>
                        <p className="text-slate-400 text-sm mt-1">Fill in your delivery details below</p>
                    </motion.div>

                    <motion.div
                        variants={shakeVariants}
                        animate={shaking ? "shake" : ""}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                            className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-slate-100/60 p-8"
                        >
                            {/* Steps indicator */}
                            <div className="flex items-center gap-2 mb-8">
                                {["Delivery Info", "Review", "Confirm"].map((step, i) => (
                                    <React.Fragment key={step}>
                                        <div className={`flex items-center gap-1.5 text-xs font-semibold ${i === 0 ? "text-blue-600" : "text-slate-300"}`}>
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-300"}`}>
                                                {i + 1}
                                            </div>
                                            <span className="hidden sm:inline">{step}</span>
                                        </div>
                                        {i < 2 && <div className={`flex-1 h-px ${i === 0 ? "bg-slate-200" : "bg-slate-100"}`} />}
                                    </React.Fragment>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="space-y-5">
                                    {/* Customer Name */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -14 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.15, duration: 0.4 }}
                                    >
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </span>
                                            <input
                                                type="text"
                                                name="customerName"
                                                placeholder="John Doe"
                                                value={formData.customerName}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("customerName")}
                                                onBlur={() => setFocusedField(null)}
                                                className={inputClass("customerName")}
                                            />
                                        </div>
                                        <AnimatePresence>
                                            {errors.customerName && (
                                                <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="exit"
                                                    className="text-xs text-red-500 mt-1.5 flex items-center gap-1 overflow-hidden">
                                                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.customerName}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Address */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -14 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.22, duration: 0.4 }}
                                    >
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                            Delivery Address
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </span>
                                            <textarea
                                                name="address"
                                                placeholder="Street, City, State, PIN"
                                                value={formData.address}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("address")}
                                                onBlur={() => setFocusedField(null)}
                                                rows={3}
                                                className={`${inputClass("address")} resize-none pl-10`}
                                            />
                                        </div>
                                        <AnimatePresence>
                                            {errors.address && (
                                                <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="exit"
                                                    className="text-xs text-red-500 mt-1.5 flex items-center gap-1 overflow-hidden">
                                                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.address}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Mobile */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -14 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.29, duration: 0.4 }}
                                    >
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                            Mobile Number
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </span>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                placeholder="10-digit mobile number"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField("mobile")}
                                                onBlur={() => setFocusedField(null)}
                                                maxLength={10}
                                                className={inputClass("mobile")}
                                            />
                                        </div>
                                        <AnimatePresence>
                                            {errors.mobile && (
                                                <motion.p variants={errorVariants} initial="hidden" animate="visible" exit="exit"
                                                    className="text-xs text-red-500 mt-1.5 flex items-center gap-1 overflow-hidden">
                                                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                    {errors.mobile}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Submit */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.36, duration: 0.4 }}
                                        className="pt-2"
                                    >
                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }}
                                            whileTap={{ scale: loading ? 1 : 0.97 }}
                                            className={`w-full py-3.5 rounded-xl font-semibold text-sm text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${success
                                                    ? "bg-emerald-500 shadow-emerald-200"
                                                    : loading
                                                        ? "bg-blue-400 cursor-not-allowed shadow-blue-100"
                                                        : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-200"
                                                }`}
                                        >
                                            <AnimatePresence mode="wait">
                                                {success ? (
                                                    <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                                        className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Order Placed!
                                                    </motion.span>
                                                ) : loading ? (
                                                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                        className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                        </svg>
                                                        Placing Order...
                                                    </motion.span>
                                                ) : (
                                                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                        className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Place Order
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>

                                        <button
                                            type="button"
                                            onClick={() => router.push("/cart")}
                                            className="w-full mt-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all duration-150"
                                        >
                                            ← Back to Cart
                                        </button>
                                    </motion.div>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </ProtectedRoute>
    );
}