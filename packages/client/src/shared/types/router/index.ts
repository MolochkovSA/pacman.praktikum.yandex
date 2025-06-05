import { AppDispatch, AppState } from '@/shared/model/redux';

export type PageInitContext = {
  clientToken?: string;
};

export type PageInitArgs = {
  dispatch: AppDispatch;
  state: AppState;
  ctx: PageInitContext;
};
