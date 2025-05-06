import styles from './Profile.module.scss';
import { Button } from '@/shared/ui';
import { Input } from '@/shared/ui';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../model/schema';
import { Avatar } from '@/shared/ui';

export const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm({
    defaultValues: {
      first_name: 'Иван',
      second_name: 'Иванов',
      login: 'noizzer',
      email: 'email@yande.ru',
      phone: '+79000000000',
      password: 'Testpassword1',
      repeated_password: 'Testpassword1'
    },
    mode: 'onBlur',
    resolver: zodResolver(profileSchema)
  });

  const [isEditMode, setEditMode] = useState(false);

  const onSubmit = (data: any) => {
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
            label={'Имя'}
            {...register('first_name')}
            onFocus={() => trigger('first_name')}
            isInvalid={!!errors.first_name}
            error={errors.first_name?.message as string}
            readOnly={!isEditMode}
          />
          <Input
            className={styles.profile__field}
            label={'Фамилия'}
            {...register('second_name')}
            isInvalid={!!errors.second_name}
            error={errors.second_name?.message as string}
            onFocus={() => trigger('second_name')}
            readOnly={!isEditMode}
          />
          <Input
            className={styles.profile__field}
            label={'Никнейм'}
            {...register('login')}
            isInvalid={!!errors.login}
            error={errors.login?.message as string}
            onFocus={() => trigger('login')}
            readOnly={!isEditMode}
          />
          <Input
            className={styles.profile__field}
            label={'Почта'}
            type="email"
            {...register('email')}
            isInvalid={!!errors.email}
            error={errors.email?.message as string}
            onFocus={() => trigger('email')}
            readOnly={!isEditMode}
          />
          <Input
            className={styles.profile__field}
            label={'Телефон'}
            {...register('phone')}
            isInvalid={!!errors.phone}
            error={errors.phone?.message as string}
            onFocus={() => trigger('phone')}
            readOnly={!isEditMode}
          />
          <Input
            className={styles.profile__field}
            label={'Пароль'}
            {...register('password')}
            isInvalid={!!errors.password}
            error={errors.password?.message as string}
            onFocus={() => trigger('password')}
            readOnly={!isEditMode}
          />
          {isEditMode && (
            <Input
              className={styles.profile__field}
              label={'Повторите пароль'}
              {...register('repeated_password')}
              isInvalid={!!errors.repeated_password}
              error={errors.repeated_password?.message as string}
              onFocus={() => trigger('repeated_password')}
            />
          )}
          {isEditMode ? (
            <Button
              className={styles.profile__button}
              type="submit"
              name="Сохранить"
            />
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
    </main>
  );
};
