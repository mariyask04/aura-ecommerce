"use client";

import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { addToCart } from '@/services/cartservice';
import { getProductById } from '@/services/productService';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function ProductDetailsPage() {
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState("");
    const [product, setProduct] = useState(null);

    const { id } = useParams();

    const fetchProduct = async () => {
        try {
            const data = await getProductById(id);
            setProduct(data.product);

            setSelectedImage(
                data.product.images[0]
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await addToCart(product._id);
            toast.success(
                "Added to cart"
            );
        } catch (error) {
            toast.error(
                error?.response?.data
                    ?.message ||
                "Failed to add item"
            );
        }
    };

    if (loading) {
        return (
            <ProtectedRoute>
                <Navbar />
                <div className="p-8">
                    Loading...
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">
                <div className="grid md:grid-cols-2 gap-10">

                    {/* Images */}

                    <div>

                        <motion.img
                            key={selectedImage}
                            src={selectedImage}
                            alt={product.name}
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="w-full h-[500px] object-cover rounded-lg shadow"
                        />

                        <div className="flex gap-4 mt-4">
                            {product.images.map(
                                (image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt=""
                                        onClick={() =>
                                            setSelectedImage(
                                                image
                                            )
                                        }
                                        className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${selectedImage ===
                                            image
                                            ? "border-black"
                                            : "border-transparent"
                                            }`}
                                    />
                                )
                            )}
                        </div>
                    </div>

                    {/* Details */}

                    <div>
                        <h1 className="text-4xl font-bold mb-4">
                            {product.name}
                        </h1>

                        <p className="text-3xl font-semibold mb-6">
                            ₹{product.price}
                        </p>

                        <p className="text-gray-600 leading-7 mb-8">
                            {product.description}
                        </p>

                        <button
                            onClick={
                                handleAddToCart
                            }
                            className="bg-black text-white px-8 py-3 rounded hover:scale-105 transition"
                        >
                            Add To Cart
                        </button>
                    </div>

                </div>
            </div>
        </ProtectedRoute>
    );
}