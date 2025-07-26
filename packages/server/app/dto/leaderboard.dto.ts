export type PlayerListRequestDto = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type Player = {
  id: number;
  login: string;
  pacman_score: number;
  time: number;
};

export type PlayerRequestDto = {
  data: Player;
  ratingFieldName: string;
  teamName: string;
};
