import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import AllBlogs from "./views/AllBlogs";

function App() {
  return (
    <div className="font-[Inter] bg-gray-50 text-gray-800">
     
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="https://th.bing.com/th/id/OIP.vynN_VBU6lxi3pR5LOm9IgHaE_?w=274&h=185&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3"
              alt="Tiny Blog Logo"
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-2xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
              Tiny Blog
            </span>
          </Link>

         
          <div className="space-x-6 hidden md:flex">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <Link to="/about" className="hover:text-orange-600">About</Link>
            <Link to="/login" className="hover:text-orange-600">Login</Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Signup
            </Link>
            <Link to="/contact" className="hover:text-orange-600">Contact</Link>
          </div>
        </div>
      </nav>

      
      <Routes>
        <Route
          path="/"
          element={
            <>
              
              <section
                id="home"
                className="min-h-screen flex flex-col justify-center items-center text-center bg-cover bg-center pt-16 fade-in"
                style={{
                  backgroundImage:
                    "url('https://th.bing.com/th/id/OIP.RMi0jg16zIcXBh03dJ_CxwHaE8?w=268&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3')",
                }}
              >
                <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center py-20">
                  <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
                    Welcome to <span className="text-orange-400">Tiny Blog</span>
                  </h1>
                  <p className="text-lg text-gray-200 mb-8 max-w-2xl">
                    Explore, write and share inspiring stories, creative ideas, and tech
                    trends from people all over the world.
                  </p>

                  <div className="flex gap-4">
                    <Link
                      to="/blogs"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
                    >
                      Explore Blogs
                    </Link>
                    <Link
                      to="/login"
                      className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50 transition-all"
                    >
                      Login
                    </Link>
                  </div>

                  
                  <div className="mt-16 animate-bounce">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </section>

             
              <section id="reviews" className="py-20 bg-gray-100 fade-in">
                <div className="container mx-auto px-6">
                  <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">
                    User Reviews ⭐
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    
                    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col items-center text-center">
                      <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Priya Sharma"
                        className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-orange-400 shadow-md"
                      />
                      <p className="text-gray-700 italic mb-4">
                        "Tiny Blog helped me share my travel stories beautifully! Love the design."
                      </p>
                      <h4 className="font-semibold text-orange-600">— Priya Sharma</h4>
                    </div>

                    
                    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col items-center text-center">
                      <img
                        src="https://randomuser.me/api/portraits/men/46.jpg"
                        alt="Rohan Mehta"
                        className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-orange-400 shadow-md"
                      />
                      <p className="text-gray-700 italic mb-4">
                        "A great platform for writers to express themselves and reach a wide audience."
                      </p>
                      <h4 className="font-semibold text-orange-600">— Rohan Mehta</h4>
                    </div>

                    
                    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col items-center text-center">
                      <img
                        src="https://randomuser.me/api/portraits/women/65.jpg"
                        alt="Sneha Patel"
                        className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-orange-400 shadow-md"
                      />
                      <p className="text-gray-700 italic mb-4">
                        "I found so many inspiring blogs here. Clean UI and smooth navigation!"
                      </p>
                      <h4 className="font-semibold text-orange-600">— Sneha Patel</h4>
                    </div>
                  </div>
                </div>
              </section>

              
              <footer className="bg-white border-t mt-10 py-6 text-center text-gray-600">
                © 2025 Tiny Blog. Made with ❤️ by Priti.
              </footer>
            </>
          }
        />

        {}
        <Route path="/AllBlogs" element={<AllBlogs />} />

        {}
        <Route path="/login" element={<div className="pt-24 text-center text-2xl">Login Page</div>} />
        <Route path="/signup" element={<div className="pt-24 text-center text-2xl">Signup Page</div>} />
      </Routes>
    </div>
  );
}

export default App;
