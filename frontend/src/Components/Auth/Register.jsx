import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../image/teamcodeloginimg.jpg';

const Register = () => {
  const [fullname,setFullname]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phoneno,setPhoneno]=useState("");
  const [role,setRole]=useState("");
  const [error,setError]=useState("");
  const validate=()=>{
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email.test(emailRegex)){
      setError("Please Enter the Valid Email Address");
      return false
    }
    if(password.length<6){
      setError("Password must be atleast 6 characters")
      return false;
    }
    setError(" ")
    return true;
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      const response=await axios.post('http://localhost:8080/api/register', 
  { email, password },
  { headers: { 'x-api-key': 'YOUR_API_KEY_HERE' } }
);
      const data=await response.json();
      if(response.ok){
        alert("Validated")
      }else{
        setError(data.message||"Login Failed")
      }
    }catch(err){
      setError("Network or server error")
    }
  }
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
              <Link to="/contact" className="hover:text-indigo-700 transition duration-150">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white/70 shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row backdrop-blur-2xl mx-4 my-8">
          {/* Left - Image */}
          <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-purple-200">
            <img 
              src={img} 
              alt="Register illustration" 
              className="object-cover w-full h-full max-h-[520px]"
              style={{ minHeight: 360 }}
            />
          </div>

          {/* Right - Register Form */}
          <div className="flex-1 flex flex-col justify-center px-8 py-12">
            <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-4 tracking-tight">Create your <span className="text-indigo-600">TeamCode</span> Account</h2>
            <form className="flex flex-col gap-5"onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullname" className="block text-sm font-semibold text-blue-800 mb-1">Full Name</label>
                <input
                  id="fullname"
                  type="text"
                  placeholder="Enter your Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-medium transition"
                  autoComplete="name"
                  onChange={e=>setFullname(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-blue-800 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-medium transition"
                  autoComplete="email"
                  onChange={e=>setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-blue-800 mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                  className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-medium transition"
                  autoComplete="new-password"
                  onChange={e=>setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phoneno" className="block text-sm font-semibold text-blue-800 mb-1">Phone Number</label>
                <input
                  id="phoneno"
                  type="tel"
                  placeholder="Enter your Phone Number"
                  className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-medium transition"
                  autoComplete="tel"
                  onChange={e=>setPhoneno(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-blue-800 mb-1">Role</label>
                <input
                  id="role"
                  type="text"
                  placeholder="e.g. Frontend Developer, Designer"
                  className="w-full px-4 py-3 rounded-xl bg-sky-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-medium transition"
                  onChange={e=>setRole(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-xl font-semibold py-3 px-6 mt-3 shadow-lg transition-all text-lg"
              >
                Sign Up
              </button>
              <div className="text-center mt-3 text-gray-700">
                <span>Already have an account?</span>
                <Link
                  to="/login"
                  className="text-indigo-600 font-semibold hover:underline ml-1"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
