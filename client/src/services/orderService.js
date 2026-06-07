import api from "@/utils/api"

export const placeOrder = async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
}

export const getOrders = async () => {
    const response = await api.get("/orders");
    return response.data;
}