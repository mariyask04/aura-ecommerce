import Cart from "../models/Cart.model.js";

const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const existingItem = await Cart.findOne({
            user: req.user.id,
            product: productId,
        });
        if (existingItem) {
            existingItem.quantity += 1;

            await existingItem.save();

            return res.status(200).json({
                success: true,
                message: "Quantity updated",
            });
        }
        await Cart.create({
            user: req.user.id,
            product: productId,
            quantity: 1,
        });
        res.status(201).json({
            success: true,
            message: "Added to cart",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find({
            user: req.user.id
        }).populate("product");
        res.status(200).json({
            success: true,
            cartItems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const updateCartitem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const item = await Cart.findById(
            req.params.id
        );
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }
        item.quantity = quantity;
        await item.save();
        res.status(200).json({
            success: true,
            message: "Cart updated",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const removeCartItem = async (req, res) => {
    try {
        const item = await Cart.findById(req.params.id);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }
        await item.deleteOne();
        res.status(200).json({
            success: true,
            message: "Item removed",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export {
    addToCart,
    getCartItems,
    updateCartitem,
    removeCartItem
}