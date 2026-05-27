import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function DashboardLayout({ children }) {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (

        <div className="flex h-screen bg-gray-100">

            {/* SIDEBAR */}

            <div className="w-64 bg-black text-white fixed h-screen overflow-y-auto">

                <div className="p-6 text-3xl font-bold">
                    Expense Tracker
                </div>

                <nav className="mt-10 flex flex-col gap-6 px-6 text-xl">

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/expenses">
                        Expenses
                    </Link>

                    <Link to="/budgets">
                        Budgets
                    </Link>

                    <Link to="/analytics">
                        Analytics
                    </Link>

                </nav>

            </div>


            {/* MAIN CONTENT */}

            <div className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">

                {/* TOPBAR */}

                <header className="bg-white shadow px-8 py-5 flex justify-end">

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </header>


                {/* PAGE CONTENT */}

                <main className="flex-1 overflow-y-auto px-10 py-6">

                    {children}

                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;