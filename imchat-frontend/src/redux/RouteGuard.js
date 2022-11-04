import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ChatPage from '../pages/chat/ChatPage';
import LoginPage from '../pages/login/LoginPage';
 
const RouteGuard = ({children}) => { 
    if (!localStorage.getItem("USER")) {
        return <Navigate to={"/login"}/>;
    } else {
        return children;
    }
};

export default RouteGuard;