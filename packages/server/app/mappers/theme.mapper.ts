import { Theme } from '../models/theme.model';
import { ThemeDto } from '../dto/theme.dto';

export class ThemeMapper {
  themeModelToDto(theme: Theme): ThemeDto {
    return {
      id: theme.id,
      name: theme.name
    };
  }

  themesModelToDto(themes: Theme[]): ThemeDto[] {
    return themes.map((theme) => this.themeModelToDto(theme));
  }
}
