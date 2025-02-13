import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../redux/User/userSlice.js';

const AdminLogin = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/adminAuth', {
        rollNumber,
        password,
        name
      });

      setSuccessMessage(response.data.message);
      setErrorMessage('');

      if (response.status === 200 || response.status === 201) {
        dispatch(signInSuccess(response.data.user));
        navigate("/Dashboard");
      }
      console.log(response);

    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error connecting to the server');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <div className="h-1 w-16 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                         focus:ring-indigo-500 focus:border-transparent transition duration-200
                         placeholder-gray-400 shadow-sm"
                placeholder="Name (Required for new users)"
                required={!rollNumber}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                         focus:ring-indigo-500 focus:border-transparent transition duration-200
                         placeholder-gray-400 shadow-sm"
                placeholder="Enter roll number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                         focus:ring-indigo-500 focus:border-transparent transition duration-200
                         placeholder-gray-400 shadow-sm"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium
                     transform transition duration-200 hover:bg-indigo-700 focus:outline-none 
                     focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg
                     hover:shadow-xl active:scale-95"
          >
            Login
          </button>
        </form>

        {successMessage && (
          <div className="mt-4 p-4 rounded-lg bg-green-50 text-green-800 text-sm border border-green-200">
            {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-800 text-sm border border-red-200">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
