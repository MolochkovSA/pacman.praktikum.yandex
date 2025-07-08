import { useTheme } from '@/app/providers/ThemeProvider';
import Form from 'react-bootstrap/cjs/Form.js';
import styles from './ThemeToggle.module.scss';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/entities/user';
import { setUserTheme } from '../api/toggleApi';

export const ThemeToggle = () => {
  const user = useSelector(userSelectors.selectUser);
  const { theme, toggleTheme } = useTheme();
  const handleToggle = async () => {
    toggleTheme();
    if (!user) return;
    const newTheme = theme === 'light' ? 'dark' : 'light';
    await setUserTheme(newTheme, user.id);
  };

  return (
    <Form.Switch
      className={styles.toggle}
      type="switch"
      id="custom-switch"
      label={theme === 'light' ? 'Светлая тема' : 'Тёмная тема'}
      checked={theme === 'light'}
      onChange={handleToggle}
    />
  );
};
