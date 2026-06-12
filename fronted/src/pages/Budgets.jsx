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
      console.log("Failed to fetch budgets:", error);
    }
  };

  const handleEditBudget = (budget) => {
    setEditingBudgetId(budget.id);
    setAmount(budget.limitAmount);
    setMonth(`${budget.year}-${String(budget.month).padStart(2, "0")}`);
  };

  const handleDeleteBudget = async (budgetId) => {
    try {
      await deleteBudget(budgetId);
      fetchBudgets();
    } catch (error) {
      console.log("Delete Failed:", error);
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
      } else {
        await addBudget(budgetData);
      }

      setAmount("");
      setMonth("");
      setEditingBudgetId(null);
      fetchBudgets();
    } catch (error) {
      console.log("Failed to save budget:", error);
    }
  };

  const getMonthName = (month, year) =>
    new Date(year, month - 1, 1).toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Budgets</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <input
          type="number"
          placeholder="Budget Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-3 rounded-lg flex-1"
          required
          min="1"
        />
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-3 rounded-lg md:w-48"
          required
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex-1 md:flex-initial whitespace-nowrap transition-colors">
            {editingBudgetId ? "Update" : "Add"}
          </button>
          {editingBudgetId && (
            <button
              type="button"
              onClick={() => { setEditingBudgetId(null); setAmount(""); setMonth(""); }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg whitespace-nowrap transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
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
                      <button onClick={() => handleEditBudget(budget)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors">Edit</button>
                      <button onClick={() => handleDeleteBudget(budget.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors">Delete</button>
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
      </div>
    </DashboardLayout>
  );
}

export default Budgets;