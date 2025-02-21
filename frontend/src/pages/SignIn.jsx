import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Social login with ${provider}`);
      toast.success(`Logged in with ${provider}`);
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error);
      toast.error(`Error logging in with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach(msg => toast.error(msg));
      return;
    }
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      toast.success('Registration successful!');
      setFormData({
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-gray-100">
      <div className="w-full max-w-lg p-8 transform transition-all duration-500 hover:scale-[1.02]">
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          <h3 className="text-3xl mb-6 font-bold text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Create Account
          </h3>

          {/* Input Fields */}
          {[
            { name: 'username', label: 'Username', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'password', label: 'Password', type: 'password' },
            { name: 'repeatPassword', label: 'Repeat Password', type: 'password' }
          ].map((field) => (
            <div key={field.name} className="mb-6">
              <label className="block mb-2 text-gray-700 text-sm font-semibold">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label}`}
                className={`w-full h-12 px-5 py-2 border ${
                  errors[field.name] ? 'border-red-500' : 'border-gray-200'
                } rounded-xl placeholder-gray-400 text-gray-800 transition-all duration-300 
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                hover:border-orange-300`}
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 
            rounded-xl text-white font-semibold
            transform transition-all duration-300
            hover:from-orange-600 hover:to-red-600
            hover:shadow-lg hover:-translate-y-0.5
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${isLoading ? 'animate-pulse' : ''}`}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {/* Social Login Section */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { 
                provider: 'google', 
                color: 'bg-white', 
                textColor: 'text-gray-700', 
                label: 'Google',
                image: 'https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'
              },
              { 
                provider: 'facebook', 
                color: 'bg-white', 
                textColor: 'text-gray-700', 
                label: 'Facebook',
                image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'
              }
            ].map((social) => (
              <button
                key={social.provider}
                type="button"
                onClick={() => handleSocialLogin(social.provider)}
                disabled={isLoading}
                className={`${social.color} ${social.textColor} h-12 px-6
                border border-gray-200 rounded-xl font-medium
                transform transition-all duration-300
                hover:shadow-md hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-gray-300
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2`}
              >
                <img 
                  src={social.image}
                  alt={`${social.label} logo`}
                  className="w-6 h-6 object-contain"
                />
                {social.label}
              </button>
            ))}
          </div>

          <div className="text-center text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-orange-500 font-medium hover:text-orange-600 transition-colors duration-300"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
