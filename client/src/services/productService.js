import api from "@/utils/api"

export const getProducts = async (search = "", filter = "") => {
    let url = `/products?search=${search}`;

    if (filter === "under1000") {
        url += "&maxPrice=1000";
    }

    if (filter === "1000to3000") {
        url += "&minPrice=1000&maxPrice=3000";
    }

    if (filter === "above3000") {
        url += "&minPrice=3000";
    }

    const response = await api.get(url);

    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
}