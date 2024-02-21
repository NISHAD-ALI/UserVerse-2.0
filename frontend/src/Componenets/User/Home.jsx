import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from './logout';

const Home = () => {
  const username = useSelector((state) => state.user.name);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-slate-700 to-gray-600">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome, {username}!</h1>
        <p className="text-lg mb-8">Start your journey with us.</p>
        <Link to="/profile">
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300">
            Go to Profile
          </button>
        </Link>
        <br />
        <br />
        <Logout />
      </div>
    </div>
  );
};

export default Home;
