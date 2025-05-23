import { Card } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import styles from './Profile.module.scss';

import { profileSchema } from '@/shared/model/profileSchema';
import { Button } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { Avatar } from '@/shared/ui';
import { Profile } from '@/shared/model/types';
import { PasswordModal } from '@/features/changePassword/ui';
import pic from '@/assets/images/profile.png';
import { useSelector } from 'react-redux';
import { selectUserByStatus } from '@/entities/user/model/slice.ts';

export const ProfilePage = () => {
  const user = useSelector(selectUserByStatus);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<Profile>({
    defaultValues: user ?? undefined,
    mode: 'onBlur',
    resolver: zodResolver(profileSchema)
  });

  const [isEditMode, setEditMode] = useState(false);
  const [isShowedModal, setShowModal] = useState(false);

  const onSubmit = () => {
    setEditMode(false);
  };

  return (
    <main className={styles.profile}>
      <Card className={styles.profile__card}>
        <header className={styles.profile__header}>
          <h1>Профиль</h1>
          <Avatar
            src={pic}
            className={styles.profile__avatar}></Avatar>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className={styles.profile__field}
            label="Имя"
            {...register('first_name')}
            onFocus={() => trigger('first_name')}
            error={errors.first_name?.message as string}
            readOnly={!isEditMode}
            autoComplete="given-name"
          />
          <Input
            className={styles.profile__field}
            label="Фамилия"
            {...register('second_name')}
            isInvalid={!!errors.second_name}
            error={errors.second_name?.message as string}
            onFocus={() => trigger('second_name')}
            readOnly={!isEditMode}
            autoComplete="family-name"
          />
          <Input
            className={styles.profile__field}
            label="Никнейм"
            {...register('login')}
            isInvalid={!!errors.login}
            error={errors.login?.message as string}
            onFocus={() => trigger('login')}
            readOnly={!isEditMode}
            autoComplete="username"
          />
          <Input
            className={styles.profile__field}
            label="Почта"
            type="email"
            {...register('email')}
            isInvalid={!!errors.email}
            error={errors.email?.message as string}
            onFocus={() => trigger('email')}
            readOnly={!isEditMode}
            autoComplete="email"
          />
          <Input
            className={styles.profile__field}
            label="Телефон"
            {...register('phone')}
            isInvalid={!!errors.phone}
            error={errors.phone?.message as string}
            onFocus={() => trigger('phone')}
            readOnly={!isEditMode}
            autoComplete="phone"
          />

          {isEditMode ? (
            <div className={styles.profile__buttons}>
              <Button
                className={styles.profile__button}
                onClick={() => setShowModal(true)}>
                Изменить пароль
              </Button>
              <Button
                className={styles.profile__button}
                type="submit">
                Сохранить
              </Button>
            </div>
          ) : (
            <Button
              className={styles.profile__button}
              onClick={() => {
                setEditMode(true);
              }}>
              Изменить
            </Button>
          )}
        </form>
      </Card>
      <PasswordModal
        show={isShowedModal}
        onHide={() => setShowModal(false)}></PasswordModal>
    </main>
  );
};
