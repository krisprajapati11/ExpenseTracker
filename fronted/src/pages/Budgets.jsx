import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getBudgets,
  addBudget,
  updateBudget,
  deleteBudget,
} from "../services/budgetService";



function Budgets() {

  const [budgets, setBudgets] = useState([]);

  const [amount, setAmount] = useState("");

  const [month, setMonth] = useState("");

  const [editingBudgetId,
    setEditingBudgetId] =
    useState(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    fetchBudgets();
    fetchCategories();

  }, []);

  const fetchBudgets = async () => {

    try {

      const data = await getBudgets();

      setBudgets(data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchCategories = async () => {

    try {

      const data = await getCategories();

      setCategories(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleEditBudget = (
    budget
  ) => {

    setEditingBudgetId(budget.id);

    setAmount(budget.limitAmount);

    setMonth(
      `${budget.year}-${String(
        budget.month
      ).padStart(2, "0")}`
    );
  };

  const handleDeleteBudget =
    async (budgetId) => {

      try {

        await deleteBudget(
          budgetId
        );

        alert(
          "Budget Deleted"
        );

        fetchBudgets();

      } catch (error) {

        console.log(error);
        console.log(error.response);

        alert(
          "Delete Failed"
        );
      }
    };

  const handleAddBudget = async (e) => {

    e.preventDefault();

    try {

      const selectedDate = new Date(month);

      if (editingBudgetId) {

        await updateBudget(
          editingBudgetId,
          {
            limitAmount:
              Number(amount),

            month:
              selectedDate.getMonth() + 1,

            year:
              selectedDate.getFullYear(),
          }
        );

      } else {

        await addBudget({
          limitAmount:
            Number(amount),

          month:
            selectedDate.getMonth() + 1,

          year:
            selectedDate.getFullYear(),
        });
      }


      alert("Budget Added");

      setAmount("");
      setMonth("");
      setEditingBudgetId(null);

      fetchBudgets();

    } catch (error) {

      console.log(error);

      alert("Failed to add budget");
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Budgets
      </h1>

      {/* FORM */}

      <form
        onSubmit={handleAddBudget}
        className="bg-white p-6 rounded-2xl shadow mb-8 flex gap-4"
      >

        <input
          type="number"
          placeholder="Budget Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="month"
          value={month}
          onChange={(e) =>
            setMonth(e.target.value)
          }
          className="border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 rounded-lg"
        >
          Add
        </button>

      </form>


      {/* BUDGET TABLE */}

      <div className="bg-white p-6 rounded-2xl shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              {/* <th className="text-left p-3">
                Category
              </th> */}

              <th className="text-left p-3">
                Budget
              </th>

              <th className="text-left p-3">
                Spent
              </th>

              <th className="text-left p-3">
                Remaining
              </th>

              <th className="text-left p-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {budgets.map((budget) => (
              console.log(budget),

              <tr
                key={budget.id}
                className="border-b"
              >

                <td className="p-3">
                  ₹{budget.limitAmount}
                </td>

                <td className="p-3 text-red-500">
                  ₹{budget.spentAmount}
                </td>

                <td className="p-3 text-green-600">
                  ₹{budget.remainingAmount}
                </td>

                <td className="p-3 flex gap-2">

                  <button
                    onClick={() =>
                      handleEditBudget(
                        budget
                      )
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {

                      const updatedBudgets =
                        budgets.filter(
                          (x) => x.id !== budget.id
                        );

                      setBudgets(
                        updatedBudgets
                      );
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Budgets;