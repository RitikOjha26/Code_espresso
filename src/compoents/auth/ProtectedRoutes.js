import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext'

const ProtectedRoutes = ({ element }) => {
    const { loggedIn } = useAuth();

    if (!loggedIn) {
        return <Navigate to="/" replace />;
    }

    return element;
}

export default ProtectedRoutes;