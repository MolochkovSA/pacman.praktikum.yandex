import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseModal } from '@/shared/ui/Modal/modal';
import { Input } from '@/shared/ui';
import { avatarSchema } from '@/shared/model/avatarSchema';
import { Avatar } from '@/shared/model/types';

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

  const onSubmit = (data: Avatar) => {
    const file = data.avatar?.[0];
    if (file) {
      console.log('Файл загружен:', file.name);
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
