

import { createContext } from 'react';

interface ContextProps {
  theme: string;
  toggleTheme: () => void;
  changeTheme: (mode: string) => void;
};

export const ThemeContextCustom = createContext({} as ContextProps);