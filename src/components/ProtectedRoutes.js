import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function getConnection() {
    const isConnection = localStorage.getItem('isConnected')
    if (isConnection) return true
    return false
}

export default function ProtectedRoutes() {
    const isConnection = getConnection()
    return isConnection ? <Outlet/> : <Navigate to='/'/>
}

