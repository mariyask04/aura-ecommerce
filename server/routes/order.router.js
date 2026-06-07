import express from "express";
import { getOrders, placeOrder } from "../controllers/order.controller";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", placeOrder);
router.get("/", getOrders);

export default router;