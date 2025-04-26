import { memo } from 'react';
import styles from './SignUpPage.module.scss';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { BrowserRouter, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useFormValidator } from '@/shared/validators/FormValidator';
import { validationTemplate } from '@/shared/validators/Rules';

export const SignUpPage = memo(() => {
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
    <main className={styles.signin}>
      <section className={styles.signin__panel}>
        <div className={styles.signin__title}>Регистрация</div>
        <form
          className={styles.signin__form}
          onSubmit={handleSubmit(onSubmit)}>
          <Input
            className={styles.signin__field}
            label={'Почта'}
            {...register('email', useFormValidator(validationTemplate(getValues).email))}
            isInvalid={!!errors.email}
            error={errors.email?.message as string}
            onFocus={() => trigger('email')}
          />
          <Input
            className={styles.signin__field}
            label={'Логин'}
            {...register('login', useFormValidator(validationTemplate(getValues).login))}
            isInvalid={!!errors.login}
            error={errors.login?.message as string}
            onFocus={() => trigger('login')}
          />
          <Input
            className={styles.signin__field}
            label={'Имя'}
            {...register('first_name', useFormValidator(validationTemplate(getValues).first_name))}
            isInvalid={!!errors.first_name}
            error={errors.first_name?.message as string}
            onFocus={() => trigger('first_name')}
          />
          <Input
            className={styles.signin__field}
            label={'Фамилия'}
            {...register('second_name', useFormValidator(validationTemplate(getValues).second_name))}
            isInvalid={!!errors.second_name}
            error={errors.second_name?.message as string}
            onFocus={() => trigger('second_name')}
          />
          <Input
            className={styles.signin__field}
            label={'Телефон'}
            {...register('phone', useFormValidator(validationTemplate(getValues).phone))}
            isInvalid={!!errors.phone}
            error={errors.phone?.message as string}
            onFocus={() => trigger('phone')}
          />
          <Input
            className={styles.signin__field}
            label={'Пароль'}
            {...register('password', useFormValidator(validationTemplate(getValues).password))}
            isInvalid={!!errors.password}
            type={'password'}
            error={errors.password?.message as string}
            onFocus={() => trigger('password')}
          />
          <Input
            className={styles.signin__field}
            label={'Пароль (еще раз)'}
            {...register('password_two', useFormValidator(validationTemplate(getValues).password_two))}
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
});
