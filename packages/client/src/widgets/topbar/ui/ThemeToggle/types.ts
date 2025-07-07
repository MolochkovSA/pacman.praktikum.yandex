export interface UserThemeResponseDto {
  externalUserId: string;
  theme: ThemeName;
}
export type ThemeName = 'light' | 'dark';

export interface UserThemeDto {
  externalUserId: string;
  themeId: number;
}
