"use client";

import { motion } from "framer-motion";

export default function CartItem({ item, onQuantityChange, onRemove }) {
    return (
        <motion.div
            layout
            initial={{
                opacity: 0,
                x: -20,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            exit={{
                opacity: 0,
                x: 50,
            }}
            className="bg-white rounded-lg shadow p-4 flex gap-4"
        >
            <img
                src={item.product.images?.[0]}
                alt={item.product.name}
                className="w-28 h-28 object-cover rounded"
            />

            <div className="flex-1">
                <h2 className="font-semibold text-lg">
                    {item.product.name}
                </h2>

                <p className="text-gray-600">
                    ₹{item.product.price}
                </p>

                <div className="flex items-center gap-3 mt-3">
                    <button
                        onClick={() =>
                            onQuantityChange(
                                item,
                                item.quantity - 1
                            )
                        }
                        className="border px-3 py-1 rounded"
                    >
                        -
                    </button>

                    <span>
                        {item.quantity}
                    </span>

                    <button
                        onClick={() =>
                            onQuantityChange(
                                item,
                                item.quantity + 1
                            )
                        }
                        className="border px-3 py-1 rounded"
                    >
                        +
                    </button>
                </div>
            </div>

            <button
                onClick={() =>
                    onRemove(item._id)
                }
                className="text-red-500"
            >
                Remove
            </button>
        </motion.div>
    );
}