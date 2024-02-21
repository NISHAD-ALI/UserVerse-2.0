import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminLogoutAuth({children}) {
  const hasToken = Boolean(localStorage.getItem('adminToken'));
  
  return hasToken ? <Navigate to="/admin/dashboard" /> : children  ;
}

export default AdminLogoutAuth
