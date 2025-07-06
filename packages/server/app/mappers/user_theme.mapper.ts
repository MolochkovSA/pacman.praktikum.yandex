import { UserTheme } from '../models/user_theme.model';
import { UserThemeResponseDto } from '../dto/user_theme.dto';
import { ThemeName, DEFAULT_THEME_NAME } from '../types/theme.types';

export class UserThemeMapper {
  userThemeModelToDto(userTheme: UserTheme): UserThemeResponseDto {
    return {
      externalUserId: userTheme.externalUserId,
      theme: (userTheme.theme?.name as ThemeName) ?? DEFAULT_THEME_NAME
    };
  }
}
