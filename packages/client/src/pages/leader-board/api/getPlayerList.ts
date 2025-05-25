// TODO: add real api

import { DEFAULT_PLAYERS_ON_SCREEN } from '../constants';
import { PlayerListRequestDto, PlayerListResponseDto } from '../model/types';
import { mockPlayerList } from './mockData';

export const getPlayerList = async (page: number): Promise<PlayerListResponseDto> => {
  const skip: number = (page - 1) * DEFAULT_PLAYERS_ON_SCREEN;
  const data: PlayerListRequestDto = { skip, limit: DEFAULT_PLAYERS_ON_SCREEN };

  console.log('Loading players...', data);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return mockPlayerList;
};
