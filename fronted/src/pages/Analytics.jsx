import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  getCategoryAnalytics,
} from "../services/analyticsService";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Analytics() {

  const [analytics, setAnalytics] = useState([]);

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

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-8">
        Analytics
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow">

        <Pie data={chartData} />

      </div>

    </DashboardLayout>
  );
}

export default Analytics;