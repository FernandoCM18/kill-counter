import { useState, useEffect } from 'react';
import { ThemeContextCustom } from '.';

export interface ThemeState {
  theme: string;
}

export const ThemeProviderCustom = ({children}) => {

  const [theme, setTheme] = useState('light');
  const localTheme = localStorage.getItem('theme');

  useEffect(() => {
    localTheme && setTheme(localTheme)
  }, [])
  

  const toggleTheme = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      localStorage.setItem('theme', 'light')
      setTheme('light');
    }
  };

  const changeTheme = (mode: string) => {
    localStorage.setItem('theme', mode);
    setTheme(mode);
  }

  return (
    <ThemeContextCustom.Provider value={{
      theme,
      toggleTheme,
      changeTheme
    }}>
      {children}
    </ThemeContextCustom.Provider>
  );
}