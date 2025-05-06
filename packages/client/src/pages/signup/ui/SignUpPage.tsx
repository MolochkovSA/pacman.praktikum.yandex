import styles from './SignUpPage.module.scss';
import { Link } from 'react-router-dom';
import { Button, Input } from '@/shared/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/pages/signup/model/scheme';

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = (data: unknown) => {
    console.log('данные формы:', data);
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
            error={errors.email?.message as string}
            onFocus={() => trigger('email')}
          />
          <Input
            className={styles.signin__field}
            label={'Логин'}
            {...register('login')}
            error={errors.login?.message as string}
            onFocus={() => trigger('login')}
          />
          <Input
            className={styles.signin__field}
            label={'Имя'}
            {...register('first_name')}
            error={errors.first_name?.message as string}
            onFocus={() => trigger('first_name')}
          />
          <Input
            className={styles.signin__field}
            label={'Фамилия'}
            {...register('second_name')}
            error={errors.second_name?.message as string}
            onFocus={() => trigger('second_name')}
          />
          <Input
            className={styles.signin__field}
            label={'Телефон'}
            {...register('phone')}
            error={errors.phone?.message as string}
            onFocus={() => trigger('phone')}
          />
          <Input
            className={styles.signin__field}
            label={'Пароль'}
            {...register('password')}
            type={'password'}
            error={errors.password?.message as string}
            onFocus={() => trigger('password')}
          />
          <Input
            className={styles.signin__field}
            label={'Пароль (еще раз)'}
            {...register('password_two')}
            type={'password'}
            error={errors.password_two?.message as string}
            onFocus={() => trigger('password_two')}
          />
          <Button
            className={styles.signin__button}
            type={'submit'}>
            Зарегистрироваться
          </Button>
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
