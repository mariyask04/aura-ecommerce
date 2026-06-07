"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
    const router = useRouter();

    return (
        <motion.div
            whileHover={{
                y: -8,
                scale: 1.02,
            }}
            className="bg-white rounded-lg shadow overflow-hidden"
        >
            <div className="overflow-hidden">
                <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-60 object-cover hover:scale-110 transition duration-300"
                />
            </div>

            <div className="p-4">
                <h2 className="font-semibold text-lg">
                    {product.name}
                </h2>

                <p className="text-xl font-bold mt-2">
                    ₹{product.price}
                </p>

                <button
                    onClick={() =>
                        router.push(
                            `/product/${product._id}`
                        )
                    }
                    className="mt-4 w-full bg-black text-white py-2 rounded"
                >
                    View Details
                </button>
            </div>
        </motion.div>
    );
}