import { memo } from 'react';
import styles from './SignInPage.module.scss';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { BrowserRouter, Link } from 'react-router-dom';

export const SignInPage = memo(() => {
  return (
    <main className={styles.signin}>
      <section className={styles.signin__panel}>
        <div className={styles.signin__title}>Регистрация</div>
        <form className={styles.signin__form}>
          <Input
            className={styles.signin__field}
            label={'Почта'}
            name={'email'}
            handleChange={handleChange}
          />
          <Input
            className={styles.signin__field}
            label={'Логин'}
            name={'login'}
            handleChange={handleChange}
          />
          <Input
            className={styles.signin__field}
            label={'Имя'}
            name={'first_name'}
            handleChange={handleChange}
          />
          <Input
            className={styles.signin__field}
            label={'Фамилия'}
            name={'second_name'}
            handleChange={handleChange}
          />
          <Input
            className={styles.signin__field}
            label={'Телефон'}
            name={'phone'}
            handleChange={handleChange}
          />
          <Input
            className={styles.signin__field}
            label={'Пароль'}
            name={'password'}
            handleChange={handleChange}
          />
          <Input
            className={styles.signin__field}
            label={'Пароль (еще раз)'}
            name={'password_two'}
            handleChange={handleChange}
          />
          <Button
            className={styles.signin__button}
            type={'submit'}
            name={'Авторизироваться'}
            handleClick={handleClick}></Button>
          <BrowserRouter>
            <Link
              className={styles.signin__link}
              to="/login">
              Войти
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
