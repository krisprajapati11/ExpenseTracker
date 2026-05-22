import api from "../api/axios";

export const getCategoryAnalytics = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/analytics/categories",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getMonthlyAnalytics = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/analytics/monthly",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};