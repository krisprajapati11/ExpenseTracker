import api from "../api/axios";


export const getBudgets = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/budgets",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const addBudget = async (
    budgetData
) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/budgets",
        budgetData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const updateBudget = async (
    budgetId,
    budgetData
) => {
    const token = localStorage.getItem("token");
    const response = await api.put(
        `/budgets/${budgetId}`,
        budgetData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const deleteBudget =
    async (budgetId) => {

        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await api.delete(
                `/budgets/${budgetId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return response.data;
    };