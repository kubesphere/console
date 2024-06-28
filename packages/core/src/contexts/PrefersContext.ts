import { createContext, useContext } from 'react';

export const themes = ['light', 'dark'];

interface Configs {
  themeType: string;
  switchTheme: (type: string) => void;
}

export const PrefersContext = createContext<Configs>({
  themeType: 'light',
  switchTheme: () => {},
});

export const usePrefers = () => useContext(PrefersContext);
