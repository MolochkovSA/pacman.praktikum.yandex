import { DEFAULT_PLAYERS_ON_SCREEN } from '../constants';
import { PlayerListResponseDto } from '../model/types';

export const mockPlayerList: PlayerListResponseDto = {
  players: Array.from({ length: DEFAULT_PLAYERS_ON_SCREEN }, (_, index) => ({
    id: index + 1,
    login: `Mock login ${index + 1}`,
    achievement: 1000 - index * 23,
    wins: (20 - index * 2) / 2,
    games: 30 - index * 2
  })),
  total: 27
};
