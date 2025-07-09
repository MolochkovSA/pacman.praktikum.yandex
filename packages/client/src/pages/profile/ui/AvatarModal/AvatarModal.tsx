import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input, ErrorMessage, Modal } from '@/shared/ui';
import { HttpError } from '@/shared/types';
import { fetchUserThunk } from '@/entities/user';
import { profileApi } from '../../api/profileApi';
import { ChangeAvatarType } from '../../model/types';
import { changeAvatarSchema } from '../../model/schemas';
import { useNotification } from '@/entities/notification';
import { useAppDispatch } from '@/shared/model/redux';

interface AvatarModal {
  show: boolean;
  onHide: () => void;
}

export const AvatarModal = ({ show, onHide }: AvatarModal) => {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors }
  } = useForm<ChangeAvatarType>({
    mode: 'onChange',
    resolver: zodResolver(changeAvatarSchema)
  });

  const [error, setError] = useState('');

  const onClose = () => {
    onHide();
    reset();
  };

  const onSubmit = (data: ChangeAvatarType) => {
    const file = data.avatar?.[0];
    if (file) {
      profileApi
        .updateAvatar(file as File)
        .then(() => {
          dispatch(fetchUserThunk());
          notify('Аватар успешно изменен');
          onClose();
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
      showModal={show}
      title="Сменить аватар"
      onHide={onClose}
      okButton={{
        type: 'submit',
        label: 'Изменить',
        onClick: handleSubmit(onSubmit)
      }}
      cancelButton={{
        type: 'button',
        label: 'Отменить',
        onClick: onClose
      }}>
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
