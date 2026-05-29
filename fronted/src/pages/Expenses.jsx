import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getExpenses, addExpense, deleteExpense, getCategories, createCategory, updateExpense } from "../services/expenseService";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState("");
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch expenses");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalCategoryId = categoryId;

      if (categoryId === "other") {
        if (!customCategory.trim()) { alert("Please enter a category name"); return; }
        const newCategory = await createCategory(customCategory);
        finalCategoryId = newCategory.id;
        fetchCategories();
      }

      if (editingExpenseId) {
        await updateExpense(editingExpenseId, { categoryId: finalCategoryId, amount: Number(amount), description, date: new Date() });
        alert("Expense Updated");
      } else {
        await addExpense({ categoryId: finalCategoryId, amount: Number(amount), description, date: new Date() });
        alert("Expense Added");
      }

      fetchExpenses();
      setDescription(""); setAmount(""); setCategoryId(""); setCustomCategory(""); setEditingExpenseId(null);
    } catch (error) {
      console.log(error);
      alert("Failed to save expense");
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpenseId(expense.id);
    setDescription(expense.description);
    setAmount(expense.amount);
    setCategoryId(expense.categoryId);
  };

  const handleCancelEdit = () => {
    setEditingExpenseId(null);
    setDescription(""); setAmount(""); setCategoryId(""); setCustomCategory("");
  };

  const handleDeleteExpense = async (expenseId) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await deleteExpense(expenseId);
      alert("Expense Deleted");
      fetchExpenses();
    } catch (error) {
      console.log(error);
      alert("Failed to delete expense");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-3 rounded-lg" required />
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-3 rounded-lg" required min="0.01" step="0.01" />
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border p-3 rounded-lg" required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
            <option value="other">+ Add New Category</option>
          </select>
          {categoryId === "other" && (
            <input type="text" placeholder="Enter New Category Name" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} className="border p-3 rounded-lg" required />
          )}
        </div>
        <div className="flex gap-3 mt-4">
          <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg">
            {editingExpenseId ? "Update Expense" : "Add Expense"}
          </button>
          {editingExpenseId && (
            <button type="button" onClick={handleCancelEdit} className="bg-gray-400 text-white px-6 py-3 rounded-lg">Cancel</button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-2xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Category</th>
              <th className="text-center p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{expense.description}</td>
                <td className="p-3">₹{expense.amount}</td>
                <td className="p-3">{expense.categoryName}</td>
                <td className="p-3">
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => handleEditExpense(expense)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDeleteExpense(expense.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr><td colSpan="4" className="p-6 text-center text-gray-400">No expenses yet. Add one above.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Expenses;