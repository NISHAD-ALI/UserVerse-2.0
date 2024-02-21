import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutDetails } from '../../Store/Slices/UserSlice';
import { Link } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    dispatch(logoutDetails());
    navigate('/login');
  };

  return (
    <Link to="/login">
      <button
        onClick={handleLogout}
        className="text-gray-600 hover:text-gray-900 font-semibold px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-300"
      >
        Logout
      </button>
    </Link>
  );
};

export default Logout;
