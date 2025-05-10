import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { Button, IconLink, Input } from '@/shared/ui';
import { loginSchema } from '../model/schema';
import { Login } from '../model/types';

import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<Login>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: unknown) => {
    console.log('данные формы:', data);
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
              label={'Логин'}
              {...register('login')}
              error={errors.login?.message as string}
              onFocus={() => trigger('login')}
            />
            <Input
              label={'Пароль'}
              {...register('password')}
              type={'password'}
              error={errors.password?.message as string}
              onFocus={() => trigger('password')}
            />
          </form>
        </Card.Body>

        <Card.Footer className="d-flex flex-column gap-3 align-items-center">
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
