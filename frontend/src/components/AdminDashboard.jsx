import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    rollNumber: '',
    points: 0,
  });

  // Maintain separate points state for each user
  const [userPoints, setUserPoints] = useState({});

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/leaderboard/admin');
      const data = await response.json();
      setUsers(data);
      
      // Initialize points state for each user
      const initialPoints = {};
      data.forEach(user => {
        initialPoints[user._id] = {
          addPoints: 0,
          removePoints: 0
        };
      });
      setUserPoints(initialPoints);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/newUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchLeaderboard();
        setFormData({ name: '', dob: '', rollNumber: '', points: 0 });
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handlePointsChange = (userId, type, value) => {
    setUserPoints(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [type]: Number(value) || 0
      }
    }));
  };

  const handleUpdatePoints = async (userId) => {
    try {
      const points = userPoints[userId];
      const response = await fetch(`http://localhost:9000/api/users/${userId}/points`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addPoints: points.addPoints,
          removePoints: points.removePoints
        }),
      });

      if (response.ok) {
        fetchLeaderboard();
        // Reset points inputs for this user
        setUserPoints(prev => ({
          ...prev,
          [userId]: { addPoints: 0, removePoints: 0 }
        }));
      }
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Date of Birth:</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Roll Number:</label>
            <input
              type="text"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Points:</label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Roll Number</th>
              <th className="px-6 py-3 text-left">Current Points</th>
              <th className="px-6 py-3 text-left">Add Points</th>
              <th className="px-6 py-3 text-left">Remove Points</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.rollNumber}</td>
                <td className="px-6 py-4">{user.points}</td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={userPoints[user._id]?.addPoints || 0}
                    onChange={(e) => handlePointsChange(user._id, 'addPoints', e.target.value)}
                    className="border rounded px-2 py-1 w-20"
                    min="0"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={userPoints[user._id]?.removePoints || 0}
                    onChange={(e) => handlePointsChange(user._id, 'removePoints', e.target.value)}
                    className="border rounded px-2 py-1 w-20"
                    min="0"
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleUpdatePoints(user._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Update Points
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
