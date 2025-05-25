import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input, ErrorMessage, Modal } from '@/shared/ui';
import { HttpError } from '@/shared/types';
import { userActions } from '@/entities/user';
import { profileApi } from '../../api/profileApi';
import { ChangeAvatarType } from '../../model/types';
import { changeAvatarSchema } from '../../model/schemas';

interface AvatarModal {
  show: boolean;
  onHide: () => void;
}

export const AvatarModal = ({ show, onHide }: AvatarModal) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<ChangeAvatarType>({
    mode: 'onChange',
    resolver: zodResolver(changeAvatarSchema)
  });

  const [error, setError] = useState('');

  const onSubmit = (data: ChangeAvatarType) => {
    const file = data.avatar?.[0];
    if (file) {
      profileApi
        .updateAvatar(file as File)
        .then((user) => {
          dispatch(userActions.setUser(user));
          onHide();
        })
        .catch((error) => {
          if (error instanceof HttpError) {
            setError(error.message);
          }
        });
    }
  };

  return (
    <Modal
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
    </Modal>
  );
};
