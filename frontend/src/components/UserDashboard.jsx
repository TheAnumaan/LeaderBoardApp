import React, { useEffect, useState } from 'react';
import { Trophy, Crown, Medal } from 'lucide-react';

const UserLeaderboard = ({ onLoginClick }) => {
  const [users, setUsers] = useState([]);

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

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />;
      case 1:
        return <Crown className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />;
      case 2:
        return <Medal className="w-5 h-5 md:w-6 md:h-6 text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:py-12 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Leaderboard
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Top performers ranked by points
            </p>
          </div>
          <a href='http://localhost:5173/login'>
          <button
            
            className="w-full sm:w-auto bg-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg 
                     font-medium transform transition duration-200 ease-in-out hover:scale-105
                     hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                     focus:ring-offset-2 shadow-lg text-sm md:text-base"
          >
            Login for Admin
          </button></a>
          
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-purple-600">
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm text-white font-semibold">Rank</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm text-white font-semibold">Name</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm text-white font-semibold">Roll Number</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm text-white font-semibold">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="transform transition-all duration-200 hover:bg-gray-50
                             hover:scale-[1.01] cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(index)}
                        <span className={`font-medium text-sm md:text-base ${
                          index === 0 ? 'text-yellow-500' :
                          index === 1 ? 'text-gray-400' :
                          index === 2 ? 'text-amber-700' :
                          'text-gray-900'
                        }`}>
                          #{index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-sm md:text-base text-gray-900 font-medium">{user.name}</div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-sm md:text-base text-gray-500">{user.rollNumber}</div>
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs 
                                   md:text-sm font-medium bg-green-100 text-green-800">
                        {user.points} pts
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Total Players</p>
            <p className="text-xl font-bold text-gray-900">{users.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Top Score</p>
            <p className="text-xl font-bold text-gray-900">
              {users[0]?.points || 0}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Average Score</p>
            <p className="text-xl font-bold text-gray-900">
              {users.length ? Math.round(users.reduce((acc, user) => acc + user.points, 0) / users.length) : 0}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">Active Month</p>
            <p className="text-xl font-bold text-gray-900">{new Date().toLocaleString('default', { month: 'short' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLeaderboard;
