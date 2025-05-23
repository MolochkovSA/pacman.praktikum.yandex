import { Card } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, IconLink, Input } from '@/shared/ui';
import { Login } from '@/shared/model/types';
import { loginSchema } from '@/shared/model';
import { authService } from '@/shared/api';
import { SignInProps } from '@/shared/types';
import { userStoreService } from '@/shared/lib';

import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<Login>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: Login) => {
    authService
      .signIn(data as SignInProps)
      .then(() => authService.getUser())
      .then((user) => {
        userStoreService.user = user;
        navigate('/home');
      });
  };

  return (
    <main className={styles.login}>
      <Card>
        <Card.Header>
          <Card.Title className="text-center">Вход</Card.Title>
        </Card.Header>
        <Card.Body>
          <form
            id="loginForm"
            onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Логин"
              {...register('login')}
              error={errors.login?.message as string}
              onFocus={() => trigger('login')}
            />
            <Input
              label="Пароль"
              {...register('password')}
              type="password"
              error={errors.password?.message as string}
              onFocus={() => trigger('password')}
            />
          </form>
        </Card.Body>

        <Card.Footer className="d-flex flex-column gap-3 align-items-center mt-5">
          <Button
            className="w-100"
            form="loginForm"
            type="submit">
            Авторизироваться
          </Button>
          <IconLink to="/signup">Нет аккаунта?</IconLink>
        </Card.Footer>
      </Card>
    </main>
  );
};
