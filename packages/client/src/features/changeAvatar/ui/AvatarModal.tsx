import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseModal } from '@/shared/ui/Modal/modal';
import { Input } from '@/shared/ui';
import { avatarSchema } from '@/shared/model/avatarSchema';
import { Avatar } from '@/shared/model/types';
import { UserService, AuthorizationService } from '@/shared/api';
import { userStoreService } from '@/shared/lib';

interface AvatarModal {
  show: boolean;
  onHide: () => void;
}

export const AvatarModal: React.FC<AvatarModal> = ({ show, onHide }) => {
  const userService = new UserService();
  const authService = new AuthorizationService();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<Avatar>({
    mode: 'onChange',
    resolver: zodResolver(avatarSchema)
  });
  const onSubmit = (data: Avatar) => {
    const file = data.avatar?.[0];
    console.log(file);
    if (file) {
      userService
        .updateAvatar(file as File)
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
          label=""
          type="file"
          {...register('avatar')}
          isInvalid={!!errors.avatar}
          error={errors.avatar?.message as string}
          onFocus={() => trigger('avatar')}
        />
      </form>
    </BaseModal>
  );
};
