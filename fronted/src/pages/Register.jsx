import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(formData);

      navigate("/");
    } catch (err) {
      setError("Registration Failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?
          <Link
            to="/"
            className="text-blue-500 ml-1"
          >
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Register;