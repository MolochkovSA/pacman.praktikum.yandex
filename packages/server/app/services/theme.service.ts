import { Theme } from '../models/theme.model';
import { CreateThemeDto } from '../dto/theme.dto';
import { ThemeName } from '../types/theme.types';

export class ThemeService {
  async createTheme(dto: CreateThemeDto) {
    return await Theme.create({ name: dto.name });
  }

  async createThemes(names: ThemeName[]) {
    const createDtos = names.map((name) => ({ name }));
    return Theme.bulkCreate(createDtos);
  }

  async getAllThemes() {
    return await Theme.findAll();
  }

  async getThemeByName(name: ThemeName) {
    return await Theme.findOne({
      where: { name }
    });
  }
}
