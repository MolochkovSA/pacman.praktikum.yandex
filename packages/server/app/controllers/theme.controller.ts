import { Request, Response } from 'express';
import { ThemeService } from '../services/theme.service';
import { ThemeMapper } from '../mappers/theme.mapper';

const themeService = new ThemeService();
const themeMapper = new ThemeMapper();

export const getThemes = async (_: Request, res: Response) => {
  try {
    const themes = await themeService.getAllThemes();
    return res.json(themeMapper.themesModelToDto(themes));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
