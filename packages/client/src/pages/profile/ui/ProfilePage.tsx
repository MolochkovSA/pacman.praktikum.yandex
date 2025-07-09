import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { RoutePath } from '@/shared/config/routeConfig';
import { Breadcrumbs, Button, Input } from '@/shared/ui';
import { fetchUserThunk, userSelectors } from '@/entities/user';
import { ForumLayout } from '@/widgets/forum-layout';
import { getAvatarSrc } from '@/shared/lib/getAvatarSrc';
import { Profile } from '../model/types';
import { profileSchema } from '../model/schemas';
import { profileApi } from '../api/profileApi';
import { PasswordModal } from './PasswordModal/PasswordModal';
import { Avatar } from './Avatar/Avatar';
import { useAppDispatch } from '@/shared/model/redux';

import styles from './Profile.module.scss';
import { requestNotificationPermission } from '@/shared/lib/notification/requestPermission';
import { showNotification } from '@/shared/lib/notification/showNotification';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(userSelectors.selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isShowedModal, setShowModal] = useState(false);
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

  const onSubmit = (data: Profile) => {
    setIsLoading(true);
    profileApi
      .editProfile(data)
      .then(async () => {
        dispatch(fetchUserThunk());
        const granted = await requestNotificationPermission();
        if (granted) {
          showNotification('Данные изменены', {
            body: 'Ваш профиль успешно обновлён!'
          });
        }
      })
      .then(() => setEditMode(false))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <ForumLayout
        top={
          <>
            <Breadcrumbs
              links={[
                { label: 'Главная', to: RoutePath.MAIN },
                { label: 'Профиль', to: RoutePath.PROFILE.ROOT }
              ]}
            />
          </>
        }>
        <Card className={styles.profile__card}>
          <header className={styles.profile__header}>
            <h1>Профиль</h1>
            <Avatar
              src={getAvatarSrc(user?.avatar)}
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
                  type="submit"
                  disabled={isLoading}>
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
      </ForumLayout>
      <PasswordModal
        show={isShowedModal}
        onHide={() => setShowModal(false)}></PasswordModal>
    </>
  );
};
