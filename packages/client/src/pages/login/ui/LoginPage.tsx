import { memo, useEffect } from 'react';
import styles from './LoginPage.module.scss';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useFormValidator } from '@/shared/validators/FormValidator';
import { validationTemplate } from '@/shared/validators/Rules';
import { SignInProps } from '@/shared/types';
import { AuthorizationService } from '@/shared/api';
import { userStoreService } from '@/shared/lib';

export const LoginPage = memo(() => {
  const authService = new AuthorizationService();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = (data: FieldValues) => {
    authService
      .signIn(data as SignInProps)
      .then((response) => authService.getUser())
      .then((user) => {
        userStoreService.user = user;
        navigate('/home');
      });
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
          <Link
            className={styles.login__link}
            to="/signin">
            Нет аккаунта?
          </Link>
        </form>
      </section>
    </main>
  );
});
