import { User, UserId } from '@/entities/user';

export type Player = {
  id: UserId;
  login: User['login'];
  pacman_score: number;
  time: number;
};

export type PlayerListRequestDto = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type PlayerListResponseDto = {
  data: Player;
}[];

export type PlayerRequestDto = {
  data: Player;
  ratingFieldName: string;
  teamName: string;
};
