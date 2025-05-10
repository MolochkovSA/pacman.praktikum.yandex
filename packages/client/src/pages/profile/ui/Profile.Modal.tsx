import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseModal } from '@/shared/ui/Modal/modal';
import { Input } from '@/shared/ui';
import { passwordSchema } from '@/shared/model/passwordSchema';
import { Password } from '@/shared/model/types';
import { Button } from '@/shared/ui';

interface ProfilePasswordModalProps {
  show: boolean;
  onHide: () => void;
}

const defaultProfileValues: Password = {
  password: 'Testpassword1',
  password_two: 'Testpassword1'
};

export const ProfilePasswordModal: React.FC<ProfilePasswordModalProps> = ({ show, onHide }) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<Password>({
    defaultValues: defaultProfileValues,
    mode: 'onBlur',
    resolver: zodResolver(passwordSchema)
  });

  const onSubmit = (data: Password) => {
    console.log('данные формы:', data);
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
          {...register('password')}
          isInvalid={!!errors.password}
          error={errors.password?.message as string}
          onFocus={() => trigger('password')}
        />
        <Input
          label="Повторите пароль"
          {...register('password_two')}
          isInvalid={!!errors.password_two}
          error={errors.password_two?.message as string}
          onFocus={() => trigger('password_two')}
        />
      </form>
    </BaseModal>
  );
};
