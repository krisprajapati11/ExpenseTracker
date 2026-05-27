import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getCategoryAnalytics, getMonthlyAnalytics
} from "../services/analyticsService";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Analytics() {

  const [analytics, setAnalytics] = useState([]);
  const [monthlyAnalytics, setMonthlyAnalytics] = useState([]);


  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const data =
        await getCategoryAnalytics();

      setAnalytics(data);

    } catch (error) {

      console.log(error);
    }

    const monthlyData = await getMonthlyAnalytics();
    setMonthlyAnalytics(monthlyData);
  };

  const chartData = {

    labels: analytics.map(
      (item) => item.category
    ),

    datasets: [
      {
        label: "Expenses",

        data: analytics.map(
          (item) => item.total
        ),

        backgroundColor: [
          "#ef4444",
          "#3b82f6",
          "#22c55e",
          "#eab308",
          "#a855f7",
        ],

        borderWidth: 1,
      },
    ],
  };

  const barData = {

    labels: monthlyAnalytics.map(
      (item) => item.month
    ),

    datasets: [
      {
        label: "Monthly Expenses",

        data: monthlyAnalytics.map(
          (item) => item.total
        ),

        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Analytics
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow ">

        <div className="w-[400px] mx-auto">

          <Pie data={chartData} />

        </div>

        <div className="bg-white p-6 rounded-2xl shadow mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Monthly Expenses
          </h2>

          <Bar data={barData} />

        </div>

      </div>



    </DashboardLayout>
  );
}

export default Analytics;