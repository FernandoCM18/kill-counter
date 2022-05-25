import { Routes, Route } from 'react-router-dom';

import { LoginPage } from '../pages/Auth/LoginPage';
import { RegisterPage } from '../pages/Auth/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { GroupPage } from '../pages/GroupPage';
import { UserPage } from '../pages/UserPage';
import useAuth  from '../hooks/useAuth';

export const Navigate = () => {
  const { auth } = useAuth();
  
  if (!auth) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    )
  } 

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/group/" element={<GroupPage />} />
      <Route path="/user/" element={<UserPage />} />
    </Routes>
  );
}
