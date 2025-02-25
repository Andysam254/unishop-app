import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, isAuthenticated, loading, logout, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    profile_image: '',
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Initialize profileData when user is loaded
  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        profile_image: user.profile_image || '',
      });
    }
  }, [user]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      console.error("User is not defined or does not have an ID");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadResponse = await fetch('http://127.0.0.1:5000/auth/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (uploadResponse.ok) {
        const updatedProfile = { ...profileData, profile_image: uploadData.url };
        await updateProfile(updatedProfile);
        setIsEditing(false);
      } else {
        throw new Error(uploadData.message || "File upload failed");
      }
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/users/${user.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          logout();
          navigate('/signin');
        } else {
          throw new Error("Account deletion failed");
        }
      } catch (error) {
        console.error("Account deletion error:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not authorized</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Profile</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-medium text-gray-600">Username</h3>
          <p className="text-gray-800">{user?.username}</p>
        </div>

        <div className="flex justify-between">
          <h3 className="text-xl font-medium text-gray-600">Email</h3>
          <p className="text-gray-800">{user?.email}</p>
        </div>

        <div className="flex justify-between">
          <h3 className="text-xl font-medium text-gray-600">Role</h3>
          <p className={`text-sm font-semibold ${user?.role === 'admin' ? 'text-blue-900' : 'text-orange-600'}`}>
            {user?.role === 'admin' ? 'Admin' : 'Customer'}
          </p>
        </div>

        <div className="flex justify-between">
          <h3 className="text-xl font-medium text-gray-600">Profile Picture</h3>
          <img src={user?.profile_image || 'default.jpg'} alt="Profile" className="w-20 h-20 rounded-full" />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
        <button
          onClick={handleDeleteAccount}
          className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete Account
        </button>
      </div>

      {isEditing && (
        <div className="mt-6">
          <form onSubmit={handleUpdateProfile}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}