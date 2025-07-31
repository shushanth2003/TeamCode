import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-100 to-blue-300 flex flex-col">
      {/* HEADER */}
      <header className="backdrop-blur-md bg-white/60 shadow-lg py-4 px-6 flex items-center justify-between">
        {/* Logo/Title */}
        <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 tracking-tight drop-shadow-md">
          Team<span className="text-indigo-600">Code</span>
        </div>
        {/* NavLinks */}
        <nav>
          <ul className="flex gap-4 text-md font-medium">
            <li>
              <Link to="/login" className="hover:text-indigo-700 transition duration-150">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-indigo-700 transition duration-150">Register</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-700 transition duration-150">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center">
        <section className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl px-8 py-12 max-w-xl w-full mx-2 flex flex-col items-center animate-fade-in border border-blue-100">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 tracking-tight text-center drop-shadow">
            Welcome to <span className="text-indigo-600">TeamCode</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium text-center mb-8">
            Collaborate, learn, and develop alongside top developers worldwide.
            Discover partners, improve your skills, and create something <span className="text-blue-500 font-semibold">incredible</span> with a cooperative team on our platform.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="group relative bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 hover:from-blue-700 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-xl tracking-wide text-lg transition-all duration-200 outline-none ring-2 ring-transparent focus:ring-blue-200"
          >
            <span className="inline-flex items-center gap-2">
              Get Started
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </section>
      </main>
      {/* Subtle background shape on the bottom */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center opacity-40 pointer-events-none z-0">
        <div className="h-64 w-64 bg-purple-300 rounded-full blur-3xl rotate-12"></div>
      </div>
    </div>
  );
};

export default Home;

