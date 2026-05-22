import api from "../api/axios";

export const getExpenses = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get("/expenses", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;

};

export const addExpense = async (expenseData) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/expenses",
        expenseData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getCategories = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get("/categories", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createCategory = async (name) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/categories",
        {
            name,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
export const deleteExpense = async (expenseId) => {

    const token = localStorage.getItem("token");

    const response = await api.delete(
        `/expenses/${expenseId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const updateExpense = async (
    expenseId,
    expenseData
) => {

    const token = localStorage.getItem("token");

    const response = await api.put(
        `/expenses/${expenseId}`,
        expenseData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
