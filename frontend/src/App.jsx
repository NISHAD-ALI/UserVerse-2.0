import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/user/LoginPage'
import Signup from './Pages/user/SignupPage'
import ProfilePage from './Pages/user/ProfilePage'
import HomePage from './Pages/user/HomePage'
import AddUserPage from './Pages/admin/AddUserPage'
import AdminLoginPage from './Pages/admin/AdminLoginPage'
import AdminDashPage from './Pages/admin/AdminDashPage'
import AdminEditUserPage from './Pages/admin/AdminEditUserPage'
import UserLogoutAuth from './Authentication/UserLogoutAuth'
import UserLoginAuth from './Authentication/UserLoginAuth'
import AdminLoginAuth from './Authentication/AdminLoginAuth'
import AdminLogoutAuth from './Authentication/AdminLogoutAuth'


const App = () => {
  return (
   <Routes>
    {/* user */}
    <Route path='/' element={<UserLoginAuth><HomePage/> </UserLoginAuth>}/>
    <Route path='/login' element={<UserLogoutAuth> <Login /> </UserLogoutAuth>} />
    <Route path='/signup' element={<UserLogoutAuth><Signup /> </UserLogoutAuth>} />
    <Route path='/profile' element={<UserLoginAuth> <ProfilePage /> </UserLoginAuth>} />

    {/* admin */}
     
     <Route path='/admin/addUser' element={<AdminLoginAuth><AddUserPage /></AdminLoginAuth>}/>
     <Route path='/admin/login' element={<AdminLogoutAuth><AdminLoginPage /></AdminLogoutAuth>}/>
     <Route path='/admin/dashboard' element={<AdminLoginAuth><AdminDashPage /></AdminLoginAuth>}/>
     <Route path='/admin/edit/:id' element={<AdminLoginAuth><AdminEditUserPage /></AdminLoginAuth>}/>
    </Routes>

  )
}

export default App
