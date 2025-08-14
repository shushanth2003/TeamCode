import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img from '../image/teamcodeloginimg.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Email regex for basic validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setSuccess('');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setSuccess('');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    if (!validate()) return;
    try {
      const response = await axios.post(
        'http://localhost:8080/api/login',
        { email, password },
        { headers: { 'x-api-key': 'YOUR_API_KEY_HERE' } }
      );
      setError('');
      setSuccess('Login Successful! 🎉');
      // Optionally hide message after a delay
      setTimeout(() => setSuccess(''), 2500);
      // Optional: redirect after delay here
    } catch (err) {
      if (err.response && err.response.data) {
        setSuccess('');
        setError(err.response.data.message || 'Login Failed');
      } else {
        setSuccess('');
        setError('Network or server error');
      }
    }
  };

  // Custom message box for feedback
  const FeedbackBox = ({ message, type }) => (
    <div
      className={`
        flex items-center gap-2 max-w-xs mx-auto my-2 px-4 py-3 rounded-lg shadow-lg font-semibold
        ${type === 'success'
          ? 'bg-green-100 text-green-800 border border-green-300'
          : 'bg-red-100 text-red-800 border border-red-300'}
        animate-fade-in
      `}
      style={{ animation: 'fadeIn 0.3s' }}
    >
      {type === 'success' ? (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      <span>{message}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-100 to-blue-300 flex flex-col">
      {/* HEADER ... unchanged ... */}

      <header className="backdrop-blur-md bg-white/60 shadow-lg py-4 px-6 flex items-center justify-between">
        <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 tracking-tight drop-shadow-md">
          Team<span className="text-indigo-600">Code</span>
        </div>
        <nav>
          <ul className="flex gap-4 text-md font-medium">
            <li>
              <Link to="/login" className="hover:text-indigo-700 transition duration-150">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-indigo-700 transition duration-150">
                Register
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-700 transition duration-150">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white/70 shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row backdrop-blur-2xl mx-4 my-8">
          {/* Left - Image */}
          <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-purple-200">
            <img
              src={img}
              alt="login illustration"
              className="object-cover w-full h-full max-h-[480px]"
              style={{ minHeight: 360 }}
            />
          </div>

          {/* Right - Login Form */}
          <div className="flex-1 flex flex-col justify-center px-8 py-12">
            <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-4 tracking-tight">
              Sign In to <span className="text-indigo-600">TeamCode</span>
            </h2>

            {/* Show styled messages */}
            {success && <FeedbackBox message={success} type="success" />}
            {error && <FeedbackBox message={error} type="error" />}

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-blue-800 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-medium transition"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-blue-800 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-medium transition"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-xl font-semibold py-3 px-6 mt-2 shadow-lg transition-all text-lg"
              >
                Sign in
              </button>
              <div className="text-center mt-4 text-gray-700">
                <span>Don't have an account? </span>
                <Link
                  to="/register"
                  className="text-indigo-600 font-semibold hover:underline ml-1"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
