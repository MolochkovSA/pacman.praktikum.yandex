import { memo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { BrowserRouter, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useFormValidator } from '@/shared/validators/FormValidator';
import { validationTemplate } from '@/shared/validators/Rules';
import { Button, Input } from '@/shared/ui';

import styles from './LoginPage.module.scss';
import { loginSchema } from '../model/schema';
import { Login } from '../model/types';

export const LoginPage = memo(() => {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors }
  } = useForm<Login>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: any) => {
    console.log('данные формы:', data);
  };

  return (
    <main className={styles.login}>
      <section className={styles.login__panel}>
        <div className={styles.login__title}>Вход</div>
        <form
          className={styles.login__form}
          onSubmit={handleSubmit(onSubmit)}>
          <Input
            className={styles.login__field}
            label={'Логин'}
            {...register('login')}
            isInvalid={!!errors.login}
            error={errors.login?.message as string}
            onFocus={() => trigger('login')}
          />
          <Input
            className={styles.login__field}
            label={'Пароль'}
            {...register('password')}
            isInvalid={!!errors.password}
            type={'password'}
            error={errors.password?.message as string}
            onFocus={() => trigger('password')}
          />
          <Button
            className={styles.login__button}
            type={'submit'}
            name={'Авторизироваться'}></Button>
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
