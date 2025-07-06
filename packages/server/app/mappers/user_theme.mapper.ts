import { UserTheme } from '../models/user_theme.model';
import { UserThemeResponseDto } from '../dto/user_theme.dto';

export class UserThemeMapper {
  userThemeModelToDto(userTheme: UserTheme): UserThemeResponseDto {
    return {
      externalUserId: userTheme.externalUserId,
      theme: userTheme.theme?.name ?? 'dark'
    };
  }
}
