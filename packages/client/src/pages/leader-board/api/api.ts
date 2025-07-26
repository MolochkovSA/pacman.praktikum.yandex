import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PlayerListRequestDto, PlayerListResponseDto, PlayerRequestDto } from '../model/types';
import { PACMAN_API_URL } from '@/shared/const/api';
import { TEAM_NAME } from '../constants';

export const leaderboardApi = createApi({
  reducerPath: 'leaderboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: PACMAN_API_URL,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    fetchLeaderboard: builder.query<PlayerListResponseDto, PlayerListRequestDto>({
      query: (data: PlayerListRequestDto) => ({
        url: `/leaderboard/${TEAM_NAME}`,
        method: 'POST',
        body: data
      })
    }),
    postPlayerScore: builder.mutation({
      query: (data: PlayerRequestDto) => ({
        url: `/leaderboard`,
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useFetchLeaderboardQuery, usePostPlayerScoreMutation } = leaderboardApi;
