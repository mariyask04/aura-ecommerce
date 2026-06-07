import Cart from "../models/Cart.model.js";
import Order from "../models/Order.model.js";

const placeOrder = async (req, res) => {
    try {
        const { customerName, address, mobile } = req.body;
        const cartItems = await Cart.find({
            user: req.user.id,
        }).populate("product");
        if (!cartItems.length) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }
        const items = cartItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        }));
        const total = cartItems.reduce(
            (sum, item) =>
                sum +
                item.product.price * item.quantity,
            0
        );
        const order = await Order.create({
            customerName,
            address,
            mobile,
            user: req.user.id,
            items,
            total,
        });
        await Cart.deleteMany({
            user: req.user.id,
        });
        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id,
        })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export {
    placeOrder,
    getOrders
}