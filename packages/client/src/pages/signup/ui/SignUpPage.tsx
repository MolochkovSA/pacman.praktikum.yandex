import { Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, IconLink, Input } from '@/shared/ui';
import { signUpSchema } from '@/shared/model';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpProps } from '@/shared/types';
import { authService } from '@/shared/api';

import styles from './SignUpPage.module.scss';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = (data: SignUpProps) => {
    authService.signUp(data).then(() => navigate('/login'));
  };

  return (
    <main className={styles.signin}>
      <Card>
        <Card.Header>
          <Card.Title className="text-center">Регистрация</Card.Title>
        </Card.Header>
        <Card.Body>
          <form
            id="signup"
            onSubmit={handleSubmit(onSubmit)}>
            <Input
              label={'Почта'}
              {...register('email')}
              error={errors.email?.message as string}
              onFocus={() => trigger('email')}
            />
            <Input
              label={'Логин'}
              {...register('login')}
              error={errors.login?.message as string}
              onFocus={() => trigger('login')}
            />
            <Input
              label={'Имя'}
              {...register('first_name')}
              error={errors.first_name?.message as string}
              onFocus={() => trigger('first_name')}
            />
            <Input
              label={'Фамилия'}
              {...register('second_name')}
              error={errors.second_name?.message as string}
              onFocus={() => trigger('second_name')}
            />
            <Input
              label={'Телефон'}
              {...register('phone')}
              error={errors.phone?.message as string}
              onFocus={() => trigger('phone')}
            />
            <Input
              label={'Пароль'}
              {...register('password')}
              type={'password'}
              error={errors.password?.message as string}
              onFocus={() => trigger('password')}
            />
            <Input
              label={'Пароль (еще раз)'}
              {...register('password_two')}
              type={'password'}
              error={errors.password_two?.message as string}
              onFocus={() => trigger('password_two')}
            />
          </form>
        </Card.Body>

        <Card.Footer className="d-flex flex-column gap-3 align-items-center">
          <Button
            className="w-100"
            form="signup"
            type="submit">
            Зарегистрироваться
          </Button>
          <IconLink to="/login">Войти</IconLink>
        </Card.Footer>
      </Card>
    </main>
  );
};
