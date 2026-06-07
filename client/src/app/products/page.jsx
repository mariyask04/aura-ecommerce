"use client";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getProducts } from "@/services/productService";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProductsPage() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
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
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 rounded mb-6"
                />

                {loading ? (
                    <h2>Loading...</h2>
                ) : (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren:
                                        0.1,
                                },
                            },
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {products.map(
                            (product) => (
                                <motion.div
                                    key={
                                        product._id
                                    }
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            y: 20,
                                        },
                                        show: {
                                            opacity: 1,
                                            y: 0,
                                        },
                                    }}
                                >
                                    <ProductCard
                                        product={
                                            product
                                        }
                                    />
                                </motion.div>
                            )
                        )}
                    </motion.div>
                )}
            </div>
        </ProtectedRoute>
    );
}