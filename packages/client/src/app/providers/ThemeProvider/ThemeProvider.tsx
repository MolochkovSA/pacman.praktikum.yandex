import React, { useState, useMemo, useEffect } from 'react';
import { ThemeContext, Theme } from './ThemeContext';
import { getUserTheme } from '@/widgets/topbar/ui/ThemeToggle';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/entities/user';

const LOCAL_STORAGE_THEME_KEY = 'app-theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const user = useSelector(userSelectors.selectUser);
  useEffect(() => {
    const initTheme = async () => {
      try {
        if (user) {
          const resp = await getUserTheme(user.id);
          setTheme(resp.theme);
          localStorage.setItem(LOCAL_STORAGE_THEME_KEY, resp.theme);
        } else {
          setTheme(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme);
        }
      } catch (e) {
        console.warn('Не удалось загрузить тему с сервера или localStorage', e);
      }
    };

    initTheme();
  }, [user]);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
