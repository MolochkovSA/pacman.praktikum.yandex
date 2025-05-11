import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseModal } from '@/shared/ui/Modal/modal';
import { Input } from '@/shared/ui';
import { passwordSchema } from '@/shared/model/passwordSchema';
import { Password } from '@/shared/model/types';
import { HttpError, PasswordProps } from '@/shared/types';
import { UserService, AuthorizationService } from '@/shared/api';
import { userStoreService } from '@/shared/lib';
import { ErrorMessage } from '@/shared/ui/Error/error';

interface PasswordModalProps {
  show: boolean;
  onHide: () => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ show, onHide }) => {
  const userService = new UserService();
  const authService = new AuthorizationService();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<Password>({
    mode: 'onBlur',
    resolver: zodResolver(passwordSchema)
  });

  const [error, setError] = useState('');

  const onSubmit = (data: Password) => {
    console.log(data);
    if (data) {
      userService
        .changePassword(data as PasswordProps)
        .then(() => authService.getUser())
        .then((user) => {
          userStoreService.user = user;
        })
        .catch((error) => {
          if (error instanceof HttpError) {
            setError(error.message);
          }
        });
    }
  };
  return (
    <BaseModal
      show={show}
      title="Сменить пароль"
      onHide={onHide}
      btnText="Изменить"
      submit={handleSubmit(onSubmit)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Пароль"
          {...register('oldPassword')}
          isInvalid={!!errors.oldPassword}
          error={errors.oldPassword?.message as string}
          onFocus={() => trigger('oldPassword')}
        />
        <Input
          label="Повторите пароль"
          {...register('newPassword')}
          isInvalid={!!errors.newPassword}
          error={errors.newPassword?.message as string}
          onFocus={() => trigger('newPassword')}
        />
        <ErrorMessage error={error}></ErrorMessage>
      </form>
    </BaseModal>
  );
};
