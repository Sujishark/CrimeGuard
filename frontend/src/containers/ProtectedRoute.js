import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { fetchUser } from '../api/auth';

const ProtectedRoute = ({ children }) => {
    const user = useSelector(state => state.user)
    let location = useLocation();
    const data = JSON.parse(localStorage.getItem("_u"))
    console.log(data)
    if (!user.isAuthenticated && data && data?.token) {
        fetchUser(data.id)
    }
    if (!data && !user.isAuthenticated) {

        return <Navigate to="/login" state={{ from: location }} replace />


    }
    return children

};

export { ProtectedRoute };