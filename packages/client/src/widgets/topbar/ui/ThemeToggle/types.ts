import { Theme } from '@/app/providers/ThemeProvider/ThemeContext';

export interface UserThemeResponseDto {
  externalUserId: string;
  theme: Theme;
}

export interface UserThemeDto {
  externalUserId: string;
  themeId: number;
}
