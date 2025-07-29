import { PlayerListRequestDto } from '../dto/leaderboard.dto';

const API_URL: string = process.env.YANDEX_API_URL || '';
const leaderboardUrl: string = `${API_URL}/leaderboard`;

const fetchLeaderboard = ({
  authCookie,
  uuid,
  data,
  comandName
}: {
  authCookie: string;
  uuid: string;
  data: PlayerListRequestDto;
  comandName: string;
}): Promise<Response> => {
  return fetch(`${leaderboardUrl}/${comandName}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Cookie: `authCookie=${authCookie}; uuid=${uuid}`
    },
    body: JSON.stringify(data)
  });
};

const postPlayerScore = ({
  authCookie,
  uuid,
  data
}: {
  authCookie: string;
  uuid: string;
  data: PlayerListRequestDto;
}) => {
  return fetch(leaderboardUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Cookie: `authCookie=${authCookie}; uuid=${uuid}`
    },
    body: JSON.stringify(data)
  });
};

export const leaderboardService = { fetchLeaderboard, postPlayerScore };
