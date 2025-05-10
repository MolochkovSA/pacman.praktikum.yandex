import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import styles from './Profile.module.scss';

import { profileSchema } from '@/shared/model/profileSchema';
import { Button } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { Avatar } from '@/shared/ui';
import { Profile } from '@/shared/model/types';
import { PasswordModal } from '@/features/changePassword/ui/PasswordModal';

const defaultProfileValues: Profile = {
  first_name: 'Иван',
  second_name: 'Иванов',
  login: 'noizzer',
  email: 'email@yande.ru',
  phone: '+79000000000'
};

export const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<Profile>({
    defaultValues: defaultProfileValues,
    mode: 'onBlur',
    resolver: zodResolver(profileSchema)
  });

  const [isEditMode, setEditMode] = useState(false);
  const [isShowedModal, setShowModal] = useState(false);

  const onSubmit = (data: Profile) => {
    console.log('данные формы:', data);
    console.log(isEditMode);
    setEditMode(false);
  };

  return (
    <main className={styles.profile}>
      <section className={styles.profile__panel}>
        <header className={styles.profile__header}>
          <p>Профиль</p>
          <Avatar
            src=".\src\assets\images\profile.png"
            className={styles.profile__avatar}></Avatar>
        </header>
        <form
          className={styles.profile__form}
          onSubmit={handleSubmit(onSubmit)}>
          <Input
            className={styles.profile__field}
            label="Имя"
            {...register('first_name')}
            onFocus={() => trigger('first_name')}
            isInvalid={!!errors.first_name}
            error={errors.first_name?.message as string}
            readOnly={!isEditMode}
          />
          <Input
            className={styles.profile__field}
            label="Фамилия"
            {...register('second_name')}
            isInvalid={!!errors.second_name}
            error={errors.second_name?.message as string}
            onFocus={() => trigger('second_name')}
            readOnly={!isEditMode}
          />
          <Input
            className={styles.profile__field}
            label="Никнейм"
            {...register('login')}
            isInvalid={!!errors.login}
            error={errors.login?.message as string}
            onFocus={() => trigger('login')}
            readOnly={!isEditMode}
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
          />
          <Input
            className={styles.profile__field}
            label="Телефон"
            {...register('phone')}
            isInvalid={!!errors.phone}
            error={errors.phone?.message as string}
            onFocus={() => trigger('phone')}
            readOnly={!isEditMode}
          />

          {isEditMode ? (
            <div className={styles.profile__buttons}>
              <Button
                className={styles.profile__button}
                handleClick={() => setShowModal(true)}
                type="button"
                color="white"
                name="Изменить пароль"
              />
              <Button
                className={styles.profile__button}
                type="submit"
                name="Сохранить"
              />
            </div>
          ) : (
            <Button
              className={styles.profile__button}
              type="button"
              name="Изменить"
              handleClick={(e) => {
                e.preventDefault();
                setEditMode(true);
              }}
            />
          )}
        </form>
      </section>
      <PasswordModal
        show={isShowedModal}
        onHide={() => setShowModal(false)}></PasswordModal>
    </main>
  );
};
