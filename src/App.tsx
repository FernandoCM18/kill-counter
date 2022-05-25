import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import './App.css';
import { AppRouter } from './router/AppRouter';
import { AuthContext } from './context/Auth/AuthContext';
import { getToken, decodeToken, removeToken } from './utils/token';

function App() {

  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }
  }, []);
  

  const logout = () => {
    removeToken();
  }

  const setUser = (user) => {
    setAuth(user);
  }

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AppWraper className="App">
      <AuthContext.Provider value={authData}>
        <AppRouter />
      </AuthContext.Provider>
    </AppWraper>
  )
}

export default App;

const AppWraper = styled.div`
  background-color: ${({theme}) => theme.dark.backgroundColor};
`;
