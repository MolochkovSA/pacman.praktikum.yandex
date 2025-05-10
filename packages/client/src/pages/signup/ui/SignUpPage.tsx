import styles from './SignUpPage.module.scss';
import { Button, Input } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/pages/signup/model/scheme';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { SignUpProps } from '@/shared/types';
import { AuthorizationService } from '@/shared/api';

export const SignUpPage = () => {
  const authService = new AuthorizationService();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = (data: FieldValues) => {
    authService.signUp(data as SignUpProps).then((response) => navigate('/login'));
  };

  return (
    <main className={styles.signin}>
      <section className={styles.signin__panel}>
        <div className={styles.signin__title}>Регистрация</div>
        <form
          className={styles.signin__form}
          onSubmit={handleSubmit(onSubmit)}>
          <Input
            className={styles.signin__field}
            label={'Почта'}
            {...register('email')}
            isInvalid={!!errors.email}
            error={errors.email?.message as string}
            onFocus={() => trigger('email')}
          />
          <Input
            className={styles.signin__field}
            label={'Логин'}
            {...register('login')}
            isInvalid={!!errors.login}
            error={errors.login?.message as string}
            onFocus={() => trigger('login')}
          />
          <Input
            className={styles.signin__field}
            label={'Имя'}
            {...register('first_name')}
            isInvalid={!!errors.first_name}
            error={errors.first_name?.message as string}
            onFocus={() => trigger('first_name')}
          />
          <Input
            className={styles.signin__field}
            label={'Фамилия'}
            {...register('second_name')}
            isInvalid={!!errors.second_name}
            error={errors.second_name?.message as string}
            onFocus={() => trigger('second_name')}
          />
          <Input
            className={styles.signin__field}
            label={'Телефон'}
            {...register('phone')}
            isInvalid={!!errors.phone}
            error={errors.phone?.message as string}
            onFocus={() => trigger('phone')}
          />
          <Input
            className={styles.signin__field}
            label={'Пароль'}
            {...register('password')}
            isInvalid={!!errors.password}
            type={'password'}
            error={errors.password?.message as string}
            onFocus={() => trigger('password')}
          />
          <Input
            className={styles.signin__field}
            label={'Пароль (еще раз)'}
            {...register('password_two')}
            isInvalid={!!errors.password_two}
            type={'password'}
            error={errors.password_two?.message as string}
            onFocus={() => trigger('password_two')}
          />
          <Button
            className={styles.signin__button}
            type={'submit'}
            name={'Авторизироваться'}></Button>
          <Link
            className={styles.signin__link}
            to="/login">
            Войти
          </Link>
        </form>
      </section>
    </main>
  );
};
