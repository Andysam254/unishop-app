import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Example user data. In a real app, you would fetch this
 * from your backend or a global state management store.
 */
const initialUser = {
  username: 'Andy Gitau',
  email: 'andygitau44@gmail.com',
  phone: '+254 702******',
  shippingAddress: 'Nyahururu, Laikipia',
  newsletter: true,
  role: 'user', // change to 'admin' to see Admin Panel link
  profilePhoto: null, // could be a URL if the user already has a photo
};

export default function AccountPage() {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [resetMethod, setResetMethod] = useState('email'); // 'email' or 'phone'

  // For handling file upload for profile photo
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you might upload this file to your server or cloud storage
      const fileURL = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, profilePhoto: fileURL }));
    }
  };

  // For toggling newsletter subscription
  const handleNewsletterToggle = () => {
    setUser((prev) => ({ ...prev, newsletter: !prev.newsletter }));
  };

  // For handling edits to user details
  const handleEditUserDetails = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // For saving changes
  const handleSaveChanges = () => {
    // In a real app, you would send the updated info to your server
    setIsEditing(false);
  };

  // For resetting password (via email or phone)
  const handleResetPassword = () => {
    if (resetMethod === 'email') {
      // Send email OTP logic
      alert('Password reset link (or OTP) sent to your email.');
    } else {
      // Send phone OTP logic
      alert('OTP code sent to your phone.');
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-sm">
        <h2 className="text-xl font-bold mb-4">My Jumia Account</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/orders"
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/account/inbox"
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Inbox
              </Link>
            </li>
            <li>
              <Link
                to="/account/pending-reviews"
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Pending reviews
              </Link>
            </li>
            <li>
              <Link
                to="/account/vouchers"
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Vouchers
              </Link>
            </li>
            <li>
              <Link
                to="/account/wishlist"
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                to="/account/followed-sellers"
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Followed Sellers
              </Link>
            </li>
            <li>
              <Link
                to="/account/payment-settings"
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Payment Settings
              </Link>
            </li>
            <li>
              <Link
                to="/account/settings"
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Settings
              </Link>
            </li>
            {/* Admin Panel Link (only visible if user is admin) */}
            {user.role === 'admin' && (
              <li className="mt-4 border-t pt-4">
                <Link
                  to="/admin"
                  className="block w-full text-left px-3 py-2 bg-yellow-100 rounded hover:bg-yellow-200 font-semibold"
                >
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Account Overview</h1>
        <div className="bg-white p-4 rounded shadow-sm">
          {/* Top Section: Profile Photo + Basic Info */}
          <div className="flex items-start">
            <div className="w-32 h-32 mr-6">
              {/* Profile Photo */}
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 rounded">
                  No Photo
                </div>
              )}
              {/* Upload Button */}
              <div className="mt-2">
                <label className="cursor-pointer text-blue-600 hover:underline">
                  <span>Update Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1">
              {!isEditing ? (
                <div>
                  <p className="text-lg font-semibold">{user.username}</p>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-600">{user.phone}</p>
                  <p className="text-gray-600">{user.shippingAddress}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleEditUserDetails}
                    className="border p-2 rounded w-full"
                    placeholder="Username"
                  />
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleEditUserDetails}
                    className="border p-2 rounded w-full"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleEditUserDetails}
                    className="border p-2 rounded w-full"
                    placeholder="Phone"
                  />
                  <input
                    type="text"
                    name="shippingAddress"
                    value={user.shippingAddress}
                    onChange={handleEditUserDetails}
                    className="border p-2 rounded w-full"
                    placeholder="Shipping Address"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveChanges}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Newsletter / Preferences */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Newsletter Preferences</h3>
            <p className="text-sm text-gray-600 mb-2">
              Manage your email communications to stay updated with the latest news and offers.
            </p>
            <div className="flex items-center">
              <label className="mr-2">Receive Newsletter:</label>
              <input
                type="checkbox"
                checked={user.newsletter}
                onChange={handleNewsletterToggle}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Password Reset Section */}
        <div className="bg-white p-4 mt-4 rounded shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Reset Password</h3>
          <p className="text-sm text-gray-600 mb-2">
            Choose how you’d like to reset your password:
          </p>
          <div className="flex items-center mb-4 space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="resetMethod"
                value="email"
                checked={resetMethod === 'email'}
                onChange={(e) => setResetMethod(e.target.value)}
                className="mr-2"
              />
              Email OTP
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="resetMethod"
                value="phone"
                checked={resetMethod === 'phone'}
                onChange={(e) => setResetMethod(e.target.value)}
                className="mr-2"
              />
              Phone OTP
            </label>
          </div>
          <button
            onClick={handleResetPassword}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Send Reset Link / OTP
          </button>
        </div>
      </main>
    </div>
  );
}
