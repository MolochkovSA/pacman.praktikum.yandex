import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseModal } from '@/shared/ui/Modal/modal';
import { Input } from '@/shared/ui';
import { avatarSchema } from '@/shared/model/avatarSchema';
import { Avatar } from '@/shared/model/types';
import { userService, authService } from '@/shared/api';
import { userStoreService } from '@/shared/lib';
import { ErrorMessage } from '@/shared/ui/Error/Error';
import { HttpError } from '@/shared/types';

interface AvatarModal {
  show: boolean;
  onHide: () => void;
}

export const AvatarModal: React.FC<AvatarModal> = ({ show, onHide }) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<Avatar>({
    mode: 'onChange',
    resolver: zodResolver(avatarSchema)
  });

  const [error, setError] = useState('');

  const onSubmit = (data: Avatar) => {
    const file = data.avatar?.[0];
    if (file) {
      userService
        .updateAvatar(file as File)
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
      title="Сменить аватар"
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
        <ErrorMessage error={error}></ErrorMessage>
      </form>
    </BaseModal>
  );
};
