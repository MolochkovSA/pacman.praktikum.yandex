import { Request, Response } from 'express';
import { UserThemeService } from '../services/user_theme.service';
import { UserThemeMapper } from '../mappers/user_theme.mapper';

const userThemeService = new UserThemeService();
const userThemeMapper = new UserThemeMapper();

export const setUserTheme = async (req: Request, res: Response) => {
  try {
    const userTheme = await userThemeService.setUserTheme(req.body);
    return res.json(userThemeMapper.userThemeModelToDto(userTheme!));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserTheme = async (req: Request, res: Response) => {
  try {
    const externalUserId = req.params.externalUserId;
    const userTheme = await userThemeService.getUserTheme(externalUserId);
    return res.json(userThemeMapper.userThemeModelToDto(userTheme!));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
