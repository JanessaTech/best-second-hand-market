import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function getUser() {
    const user = localStorage.getItem('user')
    if (user) return true
    return false
}

export default function ProtectedRoutes() {
    const user = getUser()
    return user ? <Outlet/> : <Navigate to='/'/>
}

