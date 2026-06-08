"use client";

import { registerUser } from "@/services/authService";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const errorVariants = {
    hidden: { opacity: 0, y: -6, height: 0 },
    visible: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -4, height: 0, transition: { duration: 0.2 } },
};

const shakeVariants = {
    shake: {
        x: [0, -8, 8, -6, 6, -4, 4, 0],
        transition: { duration: 0.5 },
    },
};

const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const page = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [shaking, setShaking] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const getPasswordStrength = (password) => {
        if (!password) return { level: 0, label: "", color: "" };
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-400" };
        if (score === 2) return { level: 2, label: "Fair", color: "bg-amber-400" };
        if (score === 3) return { level: 3, label: "Good", color: "bg-blue-400" };
        return { level: 4, label: "Strong", color: "bg-emerald-500" };
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Enter a valid email";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
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
        setErrors({});
        try {
            setLoading(true);
            await registerUser(formData);
            setSuccess(true);
            toast.success("Registration successful");
            setTimeout(() => router.push("/"), 700);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Registration failed");
            setShaking(true);
            setTimeout(() => setShaking(false), 600);
        } finally {
            setLoading(false);
        }
    };

    const strength = getPasswordStrength(formData.password);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 px-4">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply opacity-30 animate-pulse" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply opacity-30 animate-pulse delay-1000" />
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply opacity-20 animate-pulse delay-700" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-md z-10"
            >
                <motion.div
                    variants={shakeVariants}
                    animate={shaking ? "shake" : ""}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-violet-100/60 border border-white/60 p-8"
                >
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.4 }}
                        className="mb-8 text-center"
                    >
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-200 mb-4">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Create account</h1>
                        <p className="text-sm text-slate-400 mt-1">Start your journey today</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Email Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="mb-4"
                        >
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                Email
                            </label>
                            <motion.div
                                animate={focusedField === "email" ? { scale: 1.01 } : { scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className={`relative rounded-xl transition-all duration-200 ${focusedField === "email"
                                        ? "ring-2 ring-violet-400 ring-offset-1"
                                        : errors.email
                                            ? "ring-2 ring-red-300 ring-offset-1"
                                            : ""
                                    }`}
                            >
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("email")}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-300 text-sm outline-none transition-colors duration-200 hover:border-slate-300"
                                    required
                                />
                            </motion.div>
                            <AnimatePresence>
                                {errors.email && (
                                    <motion.p
                                        variants={errorVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="text-xs text-red-500 mt-1.5 flex items-center gap-1"
                                    >
                                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.email}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.28, duration: 0.4 }}
                            className="mb-2"
                        >
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                Password
                            </label>
                            <motion.div
                                animate={focusedField === "password" ? { scale: 1.01 } : { scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className={`relative rounded-xl transition-all duration-200 ${focusedField === "password"
                                        ? "ring-2 ring-violet-400 ring-offset-1"
                                        : errors.password
                                            ? "ring-2 ring-red-300 ring-offset-1"
                                            : ""
                                    }`}
                            >
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField("password")}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-300 text-sm outline-none transition-colors duration-200 hover:border-slate-300"
                                    required
                                />
                                <motion.button
                                    type="button"
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-150 focus:outline-none"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    <AnimatePresence mode="wait">
                                        {showPassword ? (
                                            <motion.svg
                                                key="hide"
                                                initial={{ opacity: 0, rotate: -10 }}
                                                animate={{ opacity: 1, rotate: 0 }}
                                                exit={{ opacity: 0, rotate: 10 }}
                                                transition={{ duration: 0.15 }}
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </motion.svg>
                                        ) : (
                                            <motion.svg
                                                key="show"
                                                initial={{ opacity: 0, rotate: 10 }}
                                                animate={{ opacity: 1, rotate: 0 }}
                                                exit={{ opacity: 0, rotate: -10 }}
                                                transition={{ duration: 0.15 }}
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </motion.svg>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </motion.div>
                            <AnimatePresence>
                                {errors.password && (
                                    <motion.p
                                        variants={errorVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="text-xs text-red-500 mt-1.5 flex items-center gap-1"
                                    >
                                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.password}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Password Strength Bar */}
                        <AnimatePresence>
                            {formData.password && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="mb-5 overflow-hidden"
                                >
                                    <div className="flex gap-1 mt-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: i <= strength.level ? 1 : 0.15 }}
                                                transition={{ duration: 0.3, delay: i * 0.04 }}
                                                className={`h-1 flex-1 rounded-full origin-left transition-colors duration-300 ${i <= strength.level ? strength.color : "bg-slate-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className={`text-xs mt-1 font-medium transition-colors duration-300 ${strength.level === 1 ? "text-red-400"
                                            : strength.level === 2 ? "text-amber-400"
                                                : strength.level === 3 ? "text-blue-400"
                                                    : "text-emerald-500"
                                        }`}>
                                        {strength.label} password
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.4 }}
                        >
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -1 }}
                                whileTap={{ scale: loading ? 1 : 0.97 }}
                                className={`w-full py-3 rounded-xl font-semibold text-sm text-white tracking-wide transition-all duration-200 relative overflow-hidden shadow-lg shadow-violet-200 ${loading
                                        ? "bg-violet-400 cursor-not-allowed"
                                        : success
                                            ? "bg-emerald-500 shadow-emerald-200"
                                            : "bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700"
                                    }`}
                            >
                                <AnimatePresence mode="wait">
                                    {success ? (
                                        <motion.span
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <motion.svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <motion.path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2.5}
                                                    d="M5 13l4 4L19 7"
                                                    variants={checkVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                />
                                            </motion.svg>
                                            Account Created!
                                        </motion.span>
                                    ) : loading ? (
                                        <motion.span
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Creating Account...
                                        </motion.span>
                                    ) : (
                                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            Create Account
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </motion.div>
                    </form>

                    {/* Footer */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45, duration: 0.4 }}
                        className="mt-6 text-center text-sm text-slate-400"
                    >
                        Already have an account?{" "}
                        <motion.span
                            onClick={() => router.push("/")}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-violet-500 font-semibold cursor-pointer hover:text-indigo-600 transition-colors duration-150 inline-block"
                        >
                            Sign in
                        </motion.span>
                    </motion.p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default page;