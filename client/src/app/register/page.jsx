"use client";

import { registerUser } from '@/services/authService';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const page = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await registerUser(formData);

            toast.success(
                "Registration successful"
            );

            router.push("/");
        } catch (error) {
            toast.error(
                error?.response?.data
                    ?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <motion.form
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-4"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-4"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded hover:scale-105 transition"
                >
                    {loading
                        ? "Creating Account..."
                        : "Register"}
                </button>

                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <span
                        onClick={() =>
                            router.push("/")
                        }
                        className="text-blue-500 cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </motion.form>
        </div>
    );
}

export default page