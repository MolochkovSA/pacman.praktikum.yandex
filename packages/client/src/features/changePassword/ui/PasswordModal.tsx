import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseModal } from '@/shared/ui/Modal/modal';
import { Input } from '@/shared/ui';
import { passwordSchema } from '@/shared/model/passwordSchema';
import { Password } from '@/shared/model/types';
import { HttpError, PasswordProps } from '@/shared/types';
import { userService, authService } from '@/shared/api';
import { userStoreService } from '@/shared/lib';
import { ErrorMessage } from '@/shared/ui/Error/Error';

interface PasswordModalProps {
  show: boolean;
  onHide: () => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({ show, onHide }) => {
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
    if (data) {
      const { oldPassword, newPassword } = data;
      userService
        .changePassword({ oldPassword, newPassword } as PasswordProps)
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
          autoComplete="password"
        />
        <Input
          label="Новый пароль"
          {...register('newPassword')}
          isInvalid={!!errors.newPassword}
          error={errors.newPassword?.message as string}
          onFocus={() => trigger('newPassword')}
          autoComplete="off"
        />
        <Input
          label="Повторите пароль"
          {...register('repeated_password')}
          isInvalid={!!errors.repeated_password}
          error={errors.repeated_password?.message as string}
          onFocus={() => trigger('repeated_password')}
          autoComplete="off"
        />
        <ErrorMessage error={error}></ErrorMessage>
      </form>
    </BaseModal>
  );
};
