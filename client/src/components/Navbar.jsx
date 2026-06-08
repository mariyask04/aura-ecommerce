"use client";

import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { logout } = useAuth();
    const [loggingOut, setLoggingOut] = useState(false);
    const [cartBounce, setCartBounce] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        setTimeout(() => {
            logout();
            router.push("/");
        }, 400);
    };

    const handleCart = () => {
        setCartBounce(true);
        setTimeout(() => setCartBounce(false), 600);
        router.push("/cart");
    };

    return (
        <motion.nav
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm shadow-slate-100"
        >
            <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    onClick={() => router.push("/products")}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer flex items-center gap-2.5 select-none"
                >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 10h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-800">
                        Aura <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Store</span>
                    </span>
                </motion.div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Cart Button */}
                    <motion.button
                        onClick={handleCart}
                        animate={cartBounce ? { y: [0, -6, 0] } : {}}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.93 }}
                        className="relative flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm font-medium hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Cart
                    </motion.button>

                    {/* Logout Button */}
                    <motion.button
                        onClick={handleLogout}
                        disabled={loggingOut}
                        whileHover={{ scale: loggingOut ? 1 : 1.05 }}
                        whileTap={{ scale: loggingOut ? 1 : 0.93 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white shadow-md transition-all duration-200 ${loggingOut
                                ? "bg-slate-400 cursor-not-allowed shadow-slate-200"
                                : "bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black shadow-slate-300"
                            }`}
                    >
                        <AnimatePresence mode="wait">
                            {loggingOut ? (
                                <motion.span
                                    key="out"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2"
                                >
                                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Logging out...
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
}