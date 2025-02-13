import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate

const UserLeaderboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/leaderboard');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  // Handle login button click
  const handleLogin = () => {
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600"
        >
          Login for Admin
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Rank</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Roll Number</th>
              <th className="px-6 py-3 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-t">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.rollNumber}</td>
                <td className="px-6 py-4">{user.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserLeaderboard;
