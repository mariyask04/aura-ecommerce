"use client";

import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { placeOrder } from '@/services/orderService';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function CheckoutPage() {
    const [formData, setFormdata] = useState({
        customerName: "",
        address: "",
        mobile: ""
    });
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleChange = (e) => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^[0-9]{10}$/.test(formData.mobile)) {
            return toast.error(
                "Enter valid mobile number"
            );
        }
        if (
            !formData.customerName ||
            !formData.address ||
            !formData.mobile
        ) {
            return toast.error(
                "All fields are required"
            );
        }
        try {
            setLoading(true);

            await placeOrder(formData);

            toast.success(
                "Order placed successfully"
            );

            router.push("/products");
        } catch (error) {
            toast.error(
                error?.response?.data
                    ?.message ||
                "Failed to place order"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <Navbar />

            <div className="max-w-3xl mx-auto p-6">
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
                    className="bg-white shadow rounded-lg p-6"
                >
                    <h1 className="text-3xl font-bold mb-6">
                        Checkout
                    </h1>

                    <div className="space-y-4">

                        <input
                            type="text"
                            name="customerName"
                            placeholder="Customer Name"
                            value={
                                formData.customerName
                            }
                            onChange={handleChange}
                            className="w-full border rounded p-3"
                        />

                        <textarea
                            name="address"
                            placeholder="Delivery Address"
                            value={
                                formData.address
                            }
                            onChange={handleChange}
                            rows="4"
                            className="w-full border rounded p-3"
                        />

                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Mobile Number"
                            value={
                                formData.mobile
                            }
                            onChange={handleChange}
                            className="w-full border rounded p-3"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded hover:scale-105 transition"
                        >
                            {loading
                                ? "Placing Order..."
                                : "Place Order"}
                        </button>

                    </div>
                </motion.form>
            </div>
        </ProtectedRoute>
    );
}