const API_URL: string = process.env.YANDEX_API_URL || '';

const getAvatar = ({ authCookie, uuid, url }: { authCookie: string; uuid: string; url: string }): Promise<Response> => {
  return fetch(`${API_URL}${url}`, {
    credentials: 'include',
    headers: {
      Cookie: `authCookie=${authCookie}; uuid=${uuid}`
    }
  });
};

export const resourcesService = { getAvatar };
