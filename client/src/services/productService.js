import api from "@/utils/api"

export const getProducts = async (search = "") => {
    const response = await api.get(`/products?search=${search}`);
    return response.data;
}

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
}