import { User, UserId } from '@/entities/user';

export type PlayerPreview = {
  id: UserId;
  login: User['login'];
  achievement: number;
  wins: number;
  games: number;
};

export type PlayerListResponseDto = {
  players: PlayerPreview[];
  total: number;
};

export type PlayerListRequestDto = {
  skip: number;
  limit: number;
};
