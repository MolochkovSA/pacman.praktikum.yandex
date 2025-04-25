import { memo } from 'react';
import styles from './LoginPage.module.scss';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { BrowserRouter, Link } from 'react-router-dom';

export const LoginPage = memo(() => {
  return (
    <main className={styles.login}>
      <section className={styles.login__panel}>
        <div className={styles.login__title}>Вход</div>
        <form className={styles.login__form}>
          <Input
            className={styles.login__field}
            label={'Логин'}
            name={'login'}
            required={true}
            handleChange={handleChange}
          />
          <Input
            className={styles.login__field}
            label={'Пароль'}
            name={'password'}
            type={'password'}
            required={true}
            handleChange={handleChange}
          />
          <Button
            className={styles.login__button}
            type={'submit'}
            name={'Авторизироваться'}
            handleClick={handleClick}></Button>
          <BrowserRouter>
            <Link
              className={styles.login__link}
              to="/signin">
              Нет аккаунта?
            </Link>
          </BrowserRouter>
        </form>
      </section>
    </main>
  );
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  return 0;
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  return 0;
};
