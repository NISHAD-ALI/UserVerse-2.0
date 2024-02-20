import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutDetails } from '../../Store/Slices/UserSlice';
import { Link } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async()=>{
    localStorage.removeItem('token')
    dispatch(logoutDetails())
    navigate('/login')
  }

  return (
    <Link to="/login">
      <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900 font-semibold">
        Logout
      </button>
    </Link>
  );
};

export default Logout;
