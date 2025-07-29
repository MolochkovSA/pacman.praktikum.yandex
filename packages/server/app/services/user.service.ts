import FormData from 'form-data';
import { UserTheme } from '../models/user_theme.model';
import { Theme } from '../models/theme.model';
import { PasswordRequestDto, Profile, UserThemeDto } from '../dto/user.dto';
import { DEFAULT_THEME_NAME } from '../types/theme.types';

const API_URL: string = process.env.YANDEX_API_URL || '';
const userUrl: string = `${API_URL}/user`;

const findUserThemeById = async (id: number) => {
  return UserTheme.findByPk(id, { include: { model: Theme, as: 'theme' } });
};

const setUserTheme = async (dto: UserThemeDto) => {
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

  return findUserThemeById(userTheme.id);
};

const getUserTheme = async (externalUserId: string) => {
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
      userTheme = await findUserThemeById(userTheme.id);
    }
  }

  return userTheme;
};

const updateProfile = async ({
  authCookie,
  uuid,
  profile
}: {
  authCookie: string;
  uuid: string;
  profile: Profile;
}): Promise<Response> => {
  return fetch(`${userUrl}/profile`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Cookie: `authCookie=${authCookie}; uuid=${uuid}`
    },
    body: JSON.stringify(profile)
  });
};

const changePassword = async ({
  authCookie,
  uuid,
  data
}: {
  authCookie: string;
  uuid: string;
  data: PasswordRequestDto;
}): Promise<Response> => {
  return fetch(`${userUrl}/password`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Cookie: `authCookie=${authCookie}; uuid=${uuid}`
    },
    body: JSON.stringify(data)
  });
};

const updateAvatar = async ({
  authCookie,
  uuid,
  file
}: {
  authCookie: string;
  uuid: string;
  file: Express.Multer.File;
}): Promise<Response> => {
  const formData = new FormData();
  formData.append('avatar', file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype
  } as any);

  return fetch(`${userUrl}/profile/avatar`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Cookie: `authCookie=${authCookie}; uuid=${uuid}`,
      ...formData.getHeaders()
    },
    body: formData
  });
};

export const userService = { setUserTheme, getUserTheme, updateProfile, changePassword, updateAvatar };
