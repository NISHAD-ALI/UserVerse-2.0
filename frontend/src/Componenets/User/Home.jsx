import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Logout from './logout';

const Home = () => {
  const username = useSelector((state) => state.user.name);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Greetings {username}!</h1>
        <Link to="/profile"> <p className="text-lg text-gray-600">Click here to Redirect to your profile page.</p></Link>
        <br />
      <Logout />
      </div>
   
      </div>
  
  )
}

export default Home
