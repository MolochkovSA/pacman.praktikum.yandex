import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { UserThemeMapper } from '../mappers/user_theme.mapper';

const userThemeMapper = new UserThemeMapper();

const setUserTheme = async (req: Request, res: Response) => {
  try {
    const userTheme = await userService.setUserTheme(req.body);
    return res.json(userThemeMapper.userThemeModelToDto(userTheme!));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserTheme = async (req: Request, res: Response) => {
  try {
    const externalUserId = req.params.externalUserId;
    const userTheme = await userService.getUserTheme(externalUserId);
    return res.json(userThemeMapper.userThemeModelToDto(userTheme!));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { authCookie, uuid } = req.cookies;

    const response = await userService.updateProfile({ authCookie, uuid, profile: req.body });
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const { authCookie, uuid } = req.cookies;

    const response = await userService.changePassword({ authCookie, uuid, data: req.body });

    return res.status(response.status).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateAvatar = async (req: Request, res: Response) => {
  try {
    const { authCookie, uuid } = req.cookies;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const response = await userService.updateAvatar({
      authCookie,
      uuid,
      file: req.file
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Avatar update error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const userController = { setUserTheme, getUserTheme, updateProfile, changePassword, updateAvatar };
