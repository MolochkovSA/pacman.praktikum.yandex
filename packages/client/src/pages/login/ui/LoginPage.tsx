import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { RoutePath } from '@/shared/config/routeConfig';
import { Button, IconLink, Input } from '@/shared/ui';
import { SignInDto, signInSchema, useAuth } from '@/features/auth';
import { Icon } from '@/pages/home/ui/Icon/Icon.tsx';
import { useSearchParams } from 'react-router-dom';
import { useYandexAuth } from '@/features/auth/hooks/useYandexOauth.ts';

export const LoginPage = () => {
  const { signIn } = useAuth();
  const { redirectOnYandexOauth, signInWithYandex } = useYandexAuth();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<SignInDto>({
    mode: 'onBlur',
    resolver: zodResolver(signInSchema)
  });

  useEffect(() => {
    if (searchParams.get('code')) {
      signInWithYandex(searchParams.get('code')!);
    }
  }, [searchParams, signInWithYandex]);

  return (
    <Card>
      <Card.Header>
        <Card.Title className="text-center">Вход</Card.Title>
      </Card.Header>
      <Card.Body>
        <form
          id="loginForm"
          onSubmit={handleSubmit(signIn)}>
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
        <Button
          className="w-100 py-0"
          onClick={redirectOnYandexOauth}
          type="button">
          <Icon
            src="yandex"
            size={45}
          />
        </Button>
        <IconLink to={RoutePath.AUTH.SIGNUP}>Нет аккаунта?</IconLink>
      </Card.Footer>
    </Card>
  );
};
