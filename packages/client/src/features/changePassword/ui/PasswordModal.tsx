import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseModal } from '@/shared/ui/Modal/modal';
import { Input } from '@/shared/ui';
import { passwordSchema } from '@/shared/model/passwordSchema';
import { Password } from '@/shared/model/types';
import { PasswordProps } from '@/shared/types';
import { UserService, AuthorizationService } from '@/shared/api';
import { userStoreService } from '@/shared/lib';

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
          console.log(error.status, error.statusText);
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
      </form>
    </BaseModal>
  );
};
