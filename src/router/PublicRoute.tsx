import { Navigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

interface Props {
  children: any
}

export const PublicRoute = ({children}: Props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  
  return authToken
    ? <Navigate to="/home" />
    : children
}
