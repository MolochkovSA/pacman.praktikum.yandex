import { ThemeName } from '../types/theme.types';

export interface UserThemeDto {
  externalUserId: string;
  themeId: number;
}

// export interface UserThemeResponseDto {
//   externalUserId: string;
//   theme: string;
// }
export interface UserThemeResponseDto {
  externalUserId: string;
  theme: ThemeName;
}
