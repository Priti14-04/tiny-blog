import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginUser = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, user);
      if (response?.data?.success) {
        const token = response.data.token;
        const userObj = response.data.user || {};
        const userWithToken = { ...userObj, token };
        localStorage.setItem("loggedInUser", JSON.stringify(userWithToken));
        navigate('/blogs'); // redirect to blogs page
      } else {
        alert(response?.data?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login error");
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
        <h1 className="text-center text-4xl font-bold mb-6 text-gray-800">Login</h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            className="w-full bg-orange-500 text-white py-2 cursor-pointer rounded-lg font-semibold hover:bg-orange-600 transition duration-200"
            onClick={loginUser}
            type="button"
          >
            Login
          </button>

          <p className="text-center text-gray-700">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-600 font-semibold hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
