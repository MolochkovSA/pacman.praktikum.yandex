import { ThemeName } from '../types/theme.types';

export interface UserThemeDto {
  externalUserId: string;
  themeId: number;
}

export interface UserThemeResponseDto {
  externalUserId: string;
  theme: ThemeName;
}

export interface Profile {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface PasswordRequestDto {
  oldPassword: string;
  newPassword: string;
}
