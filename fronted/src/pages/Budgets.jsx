import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getBudgets, addBudget, updateBudget, deleteBudget } from "../services/budgetService";

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [editingBudgetId, setEditingBudgetId] = useState(null);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch budgets");
    }
  };

  const handleEditBudget = (budget) => {
    setEditingBudgetId(budget.id);
    setAmount(budget.limitAmount);
    setMonth(`${budget.year}-${String(budget.month).padStart(2, "0")}`);
  };

  const handleDeleteBudget = async (budgetId) => {
    if (!window.confirm("Are you sure you want to delete this budget?")) return;
    try {
      await deleteBudget(budgetId);
      alert("Budget Deleted");
      fetchBudgets();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedDate = new Date(month + "-01");
      const budgetData = {
        limitAmount: Number(amount),
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
      };

      if (editingBudgetId) {
        await updateBudget(editingBudgetId, budgetData);
        alert("Budget Updated");
      } else {
        await addBudget(budgetData);
        alert("Budget Added");
      }

      setAmount("");
      setMonth("");
      setEditingBudgetId(null);
      fetchBudgets();
    } catch (error) {
      console.log(error);
      alert("Failed to save budget");
    }
  };

  const getMonthName = (month, year) =>
    new Date(year, month - 1, 1).toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Budgets</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow mb-8 flex gap-4">
        <input
          type="number"
          placeholder="Budget Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-3 rounded-lg w-full"
          required
          min="1"
        />
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-3 rounded-lg"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-6 rounded-lg whitespace-nowrap">
          {editingBudgetId ? "Update" : "Add"}
        </button>
        {editingBudgetId && (
          <button
            type="button"
            onClick={() => { setEditingBudgetId(null); setAmount(""); setMonth(""); }}
            className="bg-gray-400 text-white px-4 rounded-lg whitespace-nowrap"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="bg-white p-6 rounded-2xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Month</th>
              <th className="text-left p-3">Budget</th>
              <th className="text-left p-3">Spent</th>
              <th className="text-left p-3">Remaining</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => (
              <tr key={budget.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{getMonthName(budget.month, budget.year)}</td>
                <td className="p-3">₹{budget.limitAmount}</td>
                <td className="p-3 text-red-500">₹{budget.spentAmount}</td>
                <td className={`p-3 font-semibold ${budget.remainingAmount < 0 ? "text-red-600" : "text-green-600"}`}>
                  ₹{budget.remainingAmount}
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEditBudget(budget)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDeleteBudget(budget.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {budgets.length === 0 && (
              <tr><td colSpan="5" className="p-6 text-center text-gray-400">No budgets yet. Add one above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Budgets;