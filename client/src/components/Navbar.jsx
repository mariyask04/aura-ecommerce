import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Navbar() {
    const router = useRouter();

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push("/");
    }
    return (
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1
                className="text-2xl font-bold cursor-pointer"
                onClick={() =>
                    router.push("/products")
                }
            >
                Aura Store
            </h1>

            <div className="flex gap-4">
                <button
                    onClick={() =>
                        router.push("/cart")
                    }
                    className="px-4 py-2 border rounded"
                >
                    Cart
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}