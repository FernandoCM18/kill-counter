import { Navigate, Route } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/Auth/AuthContext';
import { AUTH_TOKEN } from '../constants';

interface Props {
  children: any;
}

export const PrivateRoute = ({children}: Props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return authToken 
    ? children
    : <Navigate to="/auth/login" />
}