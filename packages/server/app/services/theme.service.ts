import { Theme } from '../models/theme.model';
import { CreateThemeDto } from '../dto/theme.dto';

export class ThemeService {
  async createTheme(dto: CreateThemeDto) {
    return await Theme.create({ name: dto.name });
  }

  async getAllThemes() {
    return await Theme.findAll();
  }

  async getThemeByName(name: string) {
    return await Theme.findOne({
      where: { name }
    });
  }
}
