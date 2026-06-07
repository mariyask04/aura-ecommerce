import Product from "../models/Product.model.js";

const getProducts = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query.name = {
                $regex: search,
                $options: "i",
            };
        }
        const products = await Product.find(query);
        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params.id;
        const product = await Product.findById({ id });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    getProducts,
    getProductById
}