import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { signInSuccess } from '../redux/User/userSlice.js';

const AdminLogin = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');  // New field for name
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Initialize useNavigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to authenticate the user and give admin access
      const response = await axios.post('http://localhost:9000/adminAuth', {
        rollNumber,
        password,
        name // Send name for new users
      });

      setSuccessMessage(response.data.message);
      setErrorMessage('');

      if (response.status === 200 || response.status === 201) {
        dispatch(signInSuccess(response.data.user));
        navigate("/Dashboard");
       
      }

    console.log(response);
    

      

    } catch (error) {
      // Handle error (incorrect password, user not found, etc.)
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error connecting to the server');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-6">
        {/* Name Input (Only needed for new users) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Name (Required for new users)"
            required={!rollNumber}  // If roll number is provided, name should be optional
          />
        </div>

        {/* Roll Number Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Roll Number</label>
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
        >
          Login
        </button>
      </form>

      {/* Success or Error Messages */}
      {successMessage && (
        <div className="mt-4 text-green-500 text-center">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
      )}
    </div>
  );
};

export default AdminLogin;
