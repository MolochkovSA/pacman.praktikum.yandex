import { Card } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, IconLink, Input } from '@/shared/ui';
import { Login } from '@/shared/model/types';
import { loginSchema } from '@/shared/model';
import { HttpError, SignInProps } from '@/shared/types';

import styles from './LoginPage.module.scss';
import { useDispatch } from 'react-redux';
import { setSucceededStatus } from '@/entities/user/model/slice.ts';
import { notify } from '@/shared/model/notificationSlice.ts';
import { authService } from '@/entities/user';

export const LoginPage = () => {
  const dispatch = useDispatch();
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
        dispatch(setSucceededStatus(user));
        navigate('/home');
      })
      .catch((error) => {
        if (error instanceof HttpError) {
          if (error.status === 401) {
            dispatch(notify('Неправильный логин или пароль'));
          } else if (error.status === 400) {
            dispatch(notify('Пользователь уже авторизован'));
            navigate('/home');
          } else if (error.status / 100 === 5) {
            dispatch(notify('Ошибка сервера'));
            navigate('/500');
          }
        }
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
            id="login"
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
            form="login"
            type="submit">
            Авторизироваться
          </Button>
          <IconLink to="/signup">Нет аккаунта?</IconLink>
        </Card.Footer>
      </Card>
    </main>
  );
};
