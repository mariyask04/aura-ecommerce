import dotenv from "dotenv";
import Product from "./models/Product.model.js";
import products from "./seed/products.js";
import mongoose from "mongoose";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Product.deleteMany();

await Product.insertMany(products);

console.log("Products Seeded");

process.exit();