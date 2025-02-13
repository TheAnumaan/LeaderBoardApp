import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import './App.css';
import LoginPage from './components/LoginPage';
import AdminLogin from './components/LoginPage';
import PrivateRoute from './components/Privateroute';

const App = () => {
  return (

    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 ">
        <Routes>
          <Route element ={<PrivateRoute/>}>
      <Route path='/Dashboard' element ={<AdminDashboard />}/>
            </Route>
          <Route path="/user" element={<UserDashboard />} />
    
          <Route path="/login" element={<AdminLogin/>} />


          <Route path="/" element={<Navigate to="/user" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;