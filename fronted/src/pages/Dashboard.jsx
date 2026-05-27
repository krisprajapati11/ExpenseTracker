import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getCategoryAnalytics,
  getMonthlyAnalytics,
} from "../services/analyticsService";

import { getBudgets } from "../services/budgetService";

function Dashboard() {

  const [totalExpense, setTotalExpense] =
    useState(0);

  const [monthlyExpense, setMonthlyExpense] =
    useState(0);

  const [budgets, setBudgets] = useState([]);

  useEffect(() => {

    fetchAnalytics();

    fetchBudgets();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const categoryData =
        await getCategoryAnalytics();

      const monthlyData =
        await getMonthlyAnalytics();

      // TOTAL EXPENSE

      const total = categoryData.reduce(
        (sum, item) => sum + item.total,
        0
      );

      setTotalExpense(total);

      // MONTHLY EXPENSE

      const monthly = monthlyData.reduce(
        (sum, item) => sum + item.total,
        0
      );

      setMonthlyExpense(monthly);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchBudgets = async () => {

    try {

      const data = await getBudgets();

      setBudgets(data);

    } catch (error) {

      console.log(error);
    }
  };

  // TOTAL BUDGET

  const totalBudget = budgets.reduce(
    (total, item) =>
      total + item.limitAmount,
    0
  );

  // REMAINING BALANCE

  const remainingBalance =
    totalBudget - totalExpense;

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* TOTAL BUDGET */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Total Budget
          </h2>

          <p className="text-3xl font-bold mt-4 text-blue-500">
            ₹{totalBudget}
          </p>

        </div>

        {/* TOTAL EXPENSE */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Total Expenses
          </h2>

          <p className="text-3xl font-bold mt-4 text-red-500">
            ₹{totalExpense}
          </p>

        </div>


        {/* MONTHLY EXPENSE */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Monthly Expenses
          </h2>

          <p className="text-3xl font-bold mt-4 text-orange-500">
            ₹{monthlyExpense}
          </p>

        </div>

        {/* REMAINING BALANCE */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Remaining Balance
          </h2>

          <p className="text-3xl font-bold mt-4 text-green-500">
            ₹{remainingBalance}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;