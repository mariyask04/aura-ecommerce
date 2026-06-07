import express from "express";
import { addToCart, getCartItems, removeCartItem, updateCartitem } from "../controllers/cart.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", addToCart);
router.get("/", getCartItems);
router.put("/:id", updateCartitem);
router.delete("/:id", removeCartItem);

export default router;