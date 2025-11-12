import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const signupUser = async () => {
    if (!user.name.trim() || !user.email.trim() || !user.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, user);
      if (response?.data?.success) {
        alert("Signup successful! Please login.");
        navigate('/login');
      } else {
        alert(response?.data?.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://th.bing.com/th/id/OIP.ZppDZZnFr_gqCZXnmKlbYQHaFh?w=233&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3')",
      }}
    >
      <div className="w-full max-w-md bg-white/90 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
        <h1 className="text-center text-4xl font-bold mb-6 text-gray-800">Signup</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            className="w-full bg-orange-500 text-white py-2 cursor-pointer rounded-lg font-semibold hover:bg-orange-600 transition duration-200 disabled:opacity-50"
            type="button"
            onClick={signupUser}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>

          <p className="mt-4 text-center text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
