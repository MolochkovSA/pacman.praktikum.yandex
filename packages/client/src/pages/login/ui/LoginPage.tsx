import { Card } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { RoutePath } from '@/shared/config/routeConfig';
import { Button, IconLink, Input } from '@/shared/ui';
import { SignInDto, signInSchema, useAuth } from '@/features/auth';

export const LoginPage = () => {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<SignInDto>({
    mode: 'onBlur',
    resolver: zodResolver(signInSchema)
  });

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
        <IconLink to={RoutePath.AUTH.SIGNUP}>Нет аккаунта?</IconLink>
      </Card.Footer>
    </Card>
  );
};
