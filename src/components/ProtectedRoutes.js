import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function inLogined() {
    const login = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : undefined
    return login && login?.user
}

export default function ProtectedRoutes() {
    const logined = inLogined()
    return logined ? <Outlet/> : <Navigate to='/'/>
}

