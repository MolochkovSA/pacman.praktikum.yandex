import { useTheme } from '@/app/providers/ThemeProvider';
import Form from 'react-bootstrap/Form';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Form.Switch
      className={styles.toggle}
      type="switch"
      id="custom-switch"
      label={theme === 'light' ? 'Светлая тема' : 'Тёмная тема'}
      onClick={toggleTheme}
    />
  );
};
