import { useState, useMemo, useEffect, useCallback, PropsWithChildren } from 'react';
import { ThemeContext, Theme } from './ThemeContext';
import { getUserTheme } from '@/widgets/topbar/ui/ThemeToggle';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/entities/user';

const LOCAL_STORAGE_THEME_KEY = 'app-theme';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const user = useSelector(userSelectors.selectUser);

  const setNewTheme = useCallback((theme: Theme) => {
    setTheme(theme);
    document.body.dataset.theme = theme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, []);

  useEffect(() => {
    const initTheme = async () => {
      try {
        if (user) {
          const resp = await getUserTheme(user.id);
          setNewTheme(resp.theme);
          localStorage.setItem(LOCAL_STORAGE_THEME_KEY, resp.theme);
        } else {
          const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

          if (localStorageTheme) {
            setNewTheme(localStorageTheme as Theme);
          }
        }
      } catch (e) {
        console.warn('Не удалось загрузить тему с сервера или localStorage', e);
      }
    };

    initTheme();
  }, [user, setNewTheme]);

  const toggleTheme = useCallback(() => {
    setNewTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setNewTheme]);

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
