import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function getWalletType() {
    const walletType = localStorage.getItem('walletType')
    if (walletType) return true
    return false
}

export default function ProtectedRoutes() {
    const walletType = getWalletType()
    return walletType ? <Outlet/> : <Navigate to='/'/>
}

