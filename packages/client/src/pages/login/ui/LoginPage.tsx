import { memo, useEffect } from 'react';
import styles from './LoginPage.module.scss';

import { BrowserRouter, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useFormValidator } from '@/shared/validators/FormValidator';
import { validationTemplate } from '@/shared/validators/Rules';
import { Button, Input } from '@/shared/ui';

export const LoginPage = memo(() => {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
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
            {...register('login', useFormValidator(validationTemplate(getValues).login))}
            isInvalid={!!errors.login}
            error={errors.login?.message as string}
            onFocus={() => trigger('login')}
          />
          <Input
            className={styles.login__field}
            label={'Пароль'}
            {...register('password', useFormValidator(validationTemplate(getValues).password))}
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
