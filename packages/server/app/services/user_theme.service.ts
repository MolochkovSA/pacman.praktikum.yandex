import { UserTheme } from '../models/user_theme.model';
import { Theme } from '../models/theme.model';
import { UserThemeDto } from '../dto/user_theme.dto';
import { DEFAULT_THEME_NAME } from '../types/theme.types';

export class UserThemeService {
  private async findUserThemeById(id: number) {
    return UserTheme.findByPk(id, { include: { model: Theme, as: 'theme' } });
  }

  async setUserTheme(dto: UserThemeDto) {
    let userTheme = await UserTheme.findOne({
      where: { externalUserId: dto.externalUserId }
    });

    if (userTheme) {
      userTheme.themeId = dto.themeId;
      await userTheme.save();
    } else {
      userTheme = await UserTheme.create({
        externalUserId: dto.externalUserId,
        themeId: dto.themeId
      });
    }

    return this.findUserThemeById(userTheme.id);
  }

  async getUserTheme(externalUserId: string) {
    let userTheme = await UserTheme.findOne({
      where: { externalUserId },
      include: { model: Theme, as: 'theme' }
    });

    if (!userTheme) {
      const defaultTheme = await Theme.findOne({ where: { name: DEFAULT_THEME_NAME } });

      if (defaultTheme) {
        userTheme = await UserTheme.create({
          externalUserId,
          themeId: defaultTheme.id
        });
        userTheme = await this.findUserThemeById(userTheme.id);
      }
    }

    return userTheme;
  }
}
