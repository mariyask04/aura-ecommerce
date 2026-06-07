import api from "@/utils/api"

export const addToCart = async (productId) => {
    const response = await api.post("/cart", { productId });
    return response.data;
}

export const getCartItems = async () => {
    const response = await api.get("/cart");
    return response.data;
}

export const updateCartItem = async (id, quantity) => {
    const response = await api.put(`/cart/${id}`, { quantity });
    return response.data;
}

export const removeCartItem = async (id) => {
    const response = await api.delete(`/cart/${id}`);
    return response.data;
}