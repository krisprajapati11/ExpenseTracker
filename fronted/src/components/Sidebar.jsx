import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        Expense Tracker
      </h1>

      <nav className="flex flex-col gap-4">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/expenses">Expenses</Link>

        <Link to="/budgets">Budgets</Link>

        <Link to="/analytics">Analytics</Link>

      </nav>

    </div>
  );
}

export default Sidebar;