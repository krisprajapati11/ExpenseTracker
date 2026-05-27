import api from "../api/axios";

export const getCategories = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/categories",
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    return response.data;
};