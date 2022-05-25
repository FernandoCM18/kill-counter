import { createContext } from 'react';
import { User } from '../../interfaces/user';

export const AuthContext = createContext({ 
  auth: {} as User,
  logout: () => {},
  setUser: (user: User) => {},
});
