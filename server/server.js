import connectDB from "./config/db.config.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.router.js";
import productRoutes from "./routes/product.router.js";
import cartRoutes from "./routes/cart.router.js";
import orderRoutes from "./routes/order.router.js"

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000","https://aura-ecommerce-tan.vercel.app/"]
}));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on PORT `, PORT);
})