import { useEffect, useState, useMemo, useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';
import { AppRouter } from './router/AppRouter';
import { AuthContext } from './context/Auth/AuthContext';
import { getToken, decodeToken, removeToken } from './utils/token';
import { useLocation } from 'react-router-dom';
import { themes } from './styles/ColorStyles';
import { GlobalStyle } from './components/GlobalStyle';
import { ThemeContextCustom } from './context/theme';

interface AppWrapperTheme {
  isAuthPage: boolean;
}

function App() {
  const {theme} = useContext(ThemeContextCustom);
  const {pathname} = useLocation();
  const [auth, setAuth] = useState(undefined);
  const [isAuthPage, setIsAuthPage] = useState(false);

  useEffect(() => {
    if (pathname.startsWith('/auth/')) {
      setIsAuthPage(true);
    } else {
      setIsAuthPage(false);
    }
  }, [pathname])
  

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
      setUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <AppWraper isAuthPage={isAuthPage} className="App">
        <AuthContext.Provider value={authData}>
          <AppRouter />
        </AuthContext.Provider>
      </AppWraper>
    </ThemeProvider>
  )
}

export default App;

const AppWraper = styled.div<AppWrapperTheme>`
  background-color: ${({theme, isAuthPage}) => (isAuthPage) ? theme.backgroundAuth : theme.background};
`;
