import React, { useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const signupUser = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, user);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className='text-center text-4xl font-bold mb-6'>Signup</h1>

        <div className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder='Name' 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input 
            type="email" 
            placeholder='Email' 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input 
            type="password" 
            placeholder='Password' 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button 
            className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded-lg font-semibold hover:bg-blue-600 transition duration-200" 
            type="button" 
            onClick={signupUser}
          >
            Signup
          </button>

          <p className='mt-4 text-center'>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup;
