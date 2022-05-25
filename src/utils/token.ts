import jwtDecode from 'jwt-decode';
import { AUTH_TOKEN } from '../constants';

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token: string) => {
  return localStorage.setItem(AUTH_TOKEN, token);
};

export const decodeToken = (token: string) => {
  return jwtDecode(token);
};

export const removeToken = () => {
  return localStorage.removeItem(AUTH_TOKEN);
};