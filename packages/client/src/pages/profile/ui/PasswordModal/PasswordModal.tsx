import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input, ErrorMessage, Modal } from '@/shared/ui';
import { HttpError } from '@/shared/types';
import { profileApi } from '../../api/profileApi';
import { ChangePasswordType } from '../../model/types';
import { changePasswordSchema } from '../../model/schemas';
import { useNotification } from '@/entities/notification';

interface PasswordModalProps {
  show: boolean;
  onHide: () => void;
}

export const PasswordModal = ({ show, onHide }: PasswordModalProps) => {
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors }
  } = useForm<ChangePasswordType>({
    mode: 'onBlur',
    resolver: zodResolver(changePasswordSchema)
  });

  const [error, setError] = useState('');
  const { notify } = useNotification();

  const onClose = () => {
    onHide();
    reset();
  };

  const onSubmit = (data: ChangePasswordType) => {
    const { oldPassword, newPassword } = data;

    profileApi
      .changePassword({ oldPassword, newPassword })
      .then(() => {
        notify('Пароль успешно изменен');
        onClose();
      })
      .catch((error) => {
        if (error instanceof HttpError) {
          setError(error.message);
          throw new Error(error.message);
        }
      });
  };

  return (
    <Modal
      showModal={show}
      title="Сменить пароль"
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
          label="Пароль"
          type="password"
          {...register('oldPassword')}
          isInvalid={!!errors.oldPassword}
          error={errors.oldPassword?.message as string}
          onFocus={() => trigger('oldPassword')}
          autoComplete="password"
        />
        <Input
          label="Новый пароль"
          type="password"
          {...register('newPassword')}
          isInvalid={!!errors.newPassword}
          error={errors.newPassword?.message as string}
          onFocus={() => trigger('newPassword')}
          autoComplete="off"
        />
        <Input
          label="Повторите пароль"
          type="password"
          {...register('repeated_password')}
          isInvalid={!!errors.repeated_password}
          error={errors.repeated_password?.message as string}
          onFocus={() => trigger('repeated_password')}
          autoComplete="off"
        />
        <ErrorMessage error={error}></ErrorMessage>
      </form>
    </Modal>
  );
};
