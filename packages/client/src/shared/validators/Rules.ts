import { UseFormGetValues } from 'react-hook-form';

export const validationTemplate = (getValues: UseFormGetValues<any>) => ({
  first_name: {
    required: 'Поле обязательно',
    pattern: {
      value: /^[A-ZА-Я][a-zа-яA-ZА-Я\-]*$/,
      message: 'Допустимы буквы латиницы или кириллицы, первая буква заглавная, можно использовать дефис'
    },
    minLength: { value: 0, message: '' },
    maxLength: { value: 100, message: 'Не более 100 символов' }
  },
  second_name: {
    required: 'Поле обязательно',
    pattern: {
      value: /^[A-ZА-Я][a-zа-яA-ZА-Я\-]*$/,
      message: 'Допустимы буквы латиницы или кириллицы, первая буква заглавная, можно использовать дефис'
    },
    minLength: { value: 0, message: '' },
    maxLength: { value: 100, message: 'Не более 100 символов' }
  },
  login: {
    required: 'Поле обязательно',
    pattern: {
      value: /^(?!\d+$)[a-zA-Z0-9]+$/,
      message: 'Допустимы латинские буквы и цифры, не должны быть исключительно одни цифры, не менее 3 символов'
    },
    minLength: { value: 3, message: 'Не менее 3 символов' },
    maxLength: { value: 20, message: 'Не более 20 символов' }
  },
  email: {
    required: 'Поле обязательно',
    pattern: {
      value: /^[A-Za-z0-9\-_]+@[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/,
      message:
        'Используйте латинские буквы и цифры, также дефис и нижнее подчеркивание, обязательно должны быть @ и точка'
    },
    minLength: { value: 0, message: '' },
    maxLength: { value: 100, message: 'Не более 100 символов' }
  },
  phone: {
    required: 'Поле обязательно',
    pattern: {
      value: /^\+?\d+$/,
      message: 'Используйте любые цифры, может быть + в начале, от 10 до 15 символов'
    },
    minLength: { value: 10, message: 'Не менее 10 символов' },
    maxLength: { value: 15, message: 'Не более 15 символов' }
  },
  password: {
    required: 'Поле обязательно',
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d).+$/,
      message: 'Должна быть хотя бы одна цифра и заглавная латинская буква, не менее 8 символов'
    },
    minLength: { value: 8, message: 'Не менее 8 символов' },
    maxLength: { value: 40, message: 'Не более 40 символов' }
  },
  password_two: {
    required: 'Поле обязательно',
    validate: (match: string) => {
      const password = getValues('password');
      return match === password || 'Пароли должны совпадать!';
    }
  }
});
