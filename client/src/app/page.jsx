"use client";

import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/authService";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data =
        await loginUser(formData);

      login(data.user, data.token);

      toast.success(
        "Login successful"
      );

      router.push("/products");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);
      toast.error(
        error?.response?.data
          ?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
          Login
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
            ? "Logging in..."
            : "Login"}
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <span
            onClick={() =>
              router.push(
                "/register"
              )
            }
            className="text-blue-500 cursor-pointer"
          >
            Register
          </span>
        </p>
      </motion.form>
    </div>
  );
}