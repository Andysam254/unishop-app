import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaGoogle, FaGithub } from "react-icons/fa";
import { useUser } from '../context/UserContext'; // Import the useUser hook
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser(); // Use the login function from UserContext
  const navigate = useNavigate();

  // Handle form login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password); // Use the login function from UserContext
      if (response) {
        toast.success("Login successful!");
        navigate('/'); // Redirect to home page after successful login
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    window.location.href = "http://127.0.0.1:5000/api/auth/google";
  };

  // Handle GitHub login
  const handleGitHubLogin = () => {
    console.log("GitHub login clicked");
    window.location.href = "http://127.0.0.1:5000/api/auth/github";
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="w-[40%] bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-2xl my-4 font-bold font-mono text-center">Login</h3>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Enter Email"
            required
            aria-label="Email Address"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Password"
            required
            aria-label="Password"
          />
        </div>

        {/* Sign in Button */}
        <button
          type="submit"
          className="w-full h-12 bg-orange-600 hover:bg-orange-800 transition-all duration-700 rounded-lg text-white text-base font-semibold mb-4"
          aria-label="Sign in"
        >
          Sign in
        </button>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="border-b border-gray-300 w-full"></div>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="border-b border-gray-300 w-full"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full h-12 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-all mb-2"
          aria-label="Sign in with Google"
        >
          <FaGoogle className="text-red-500 mr-2" /> Sign in with Google
        </button>

        {/* GitHub Login */}
        <button
          type="button"
          onClick={handleGitHubLogin}
          className="flex items-center justify-center w-full h-12 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-all"
          aria-label="Sign in with GitHub"
        >
          <FaGithub className="text-black mr-2" /> Sign in with GitHub
        </button>

        {/* Register Link */}
        <div className="text-center mt-4">
          Not yet registered? <Link to="/register" className="text-orange-500">Register</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}