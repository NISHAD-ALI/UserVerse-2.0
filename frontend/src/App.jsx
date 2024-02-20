import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/user/LoginPage'
import Signup from './Pages/user/SignupPage'
import ProfilePage from './Pages/user/ProfilePage'
import HomePage from './Pages/user/HomePage'
import AddUserPage from './Pages/admin/AddUserPage'
import AdminLoginPage from './Pages/user/AdminLoginPage'


const App = () => {
  return (
   <Routes>
    {/* user */}
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/profile' element={<ProfilePage />} />
    <Route path='/home' element={<HomePage/>}/>

    {/* admin */}
     
     <Route path='/admin/addUser' element={<AddUserPage />}/>
     <Route path='/admin/login' element={<AdminLoginPage />}/>
    </Routes>

  )
}

export default App
