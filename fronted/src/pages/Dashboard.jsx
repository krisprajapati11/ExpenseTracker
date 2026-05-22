import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getCategoryAnalytics,
  getMonthlyAnalytics,
} from "../services/analyticsService";

function Dashboard() {

  const [totalExpense, setTotalExpense] = useState(0);

  const [monthlyExpense, setMonthlyExpense] = useState(0);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const categoryData =
        await getCategoryAnalytics();

      const monthlyData =
        await getMonthlyAnalytics();

      // Total Expense
      const total = categoryData.reduce(
        (sum, item) => sum + item.total,
        0
      );

      setTotalExpense(total);

      // Monthly
      const monthly = monthlyData.reduce(
        (sum, item) => sum + item.total,
        0
      );

      setMonthlyExpense(monthly);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Total Expenses
          </h2>

          <p className="text-3xl font-bold mt-4 text-red-500">
            ₹{totalExpense}
          </p>

        </div>


        {/* Monthly Expense */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Monthly Expenses
          </h2>

          <p className="text-3xl font-bold mt-4 text-blue-500">
            ₹{monthlyExpense}
          </p>

        </div>


        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-gray-500 text-lg">
            Remaining Balance
          </h2>

          <p className="text-3xl font-bold mt-4 text-green-500">
            ₹{50000 - totalExpense}
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;