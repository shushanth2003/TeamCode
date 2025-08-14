import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contact = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      await axios.post(
        'http://localhost:8080/api/contact',
        { fullname, email, message },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
          },
        }
      );
      setStatus('Message sent successfully!');
      setFullname('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus('Failed to send message. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-100 to-blue-300 flex flex-col">
      {/* HEADER */}
      <header className="backdrop-blur-md bg-white/70 shadow-lg py-4 px-6 flex items-center justify-between">
        {/* Logo/Title */}
        <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 tracking-tight drop-shadow-md">
          Team<span className="text-indigo-600">Code</span>
        </div>
        {/* NavLinks */}
        <nav>
          <ul className="flex gap-6 text-md font-medium">
            <li>
              <Link to="/login" className="hover:text-indigo-700 transition duration-150">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-indigo-700 transition duration-150">Register</Link>
            </li>
            <li>
              <Link to="/contact" className="text-white bg-indigo-600 px-3 py-1 rounded shadow hover:bg-indigo-700 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-white/90 rounded-xl shadow-xl p-8 mt-8 flex flex-col md:flex-row gap-8 mx-4">
          {/* LEFT: CONTACT FORM */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-blue-800 mb-1">Contact Us</h2>
            <p className="mb-6 text-gray-600">Let’s connect! Fill out the form below and our team will get back to you promptly.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 transition resize-none"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="self-start bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold px-6 py-2 rounded-lg shadow mt-2"
              >
                Send Message
              </button>
              {status && <p className="mt-4 text-center font-semibold text-blue-700">{status}</p>}
            </form>
          </div>
          {/* RIGHT: CONTACT INFO */}
          <div className="flex-1 flex flex-col gap-6 justify-center">
            <ContactInfo
              icon="📍"
              label="Address"
              value="80/B4 Anna Salai, Chennai"
            />
            <ContactInfo
              icon="📞"
              label="Phone"
              value="+91 7010988788"
              href="tel:+917010988788"
            />
            <ContactInfo
              icon="✉️"
              label="Email"
              value="teamcode.in@gmail.com"
              href="mailto:teamcode.in@gmail.com"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const ContactInfo = ({ icon, label, value, href }) => (
  <div className="flex items-start gap-3">
    <div className="text-3xl">{icon}</div>
    <div>
      <div className="text-blue-900 font-medium">{label}</div>
      {href ? (
        <a href={href} className="text-gray-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      ) : (
        <div className="text-gray-600">{value}</div>
      )}
    </div>
  </div>
);

export default Contact;

