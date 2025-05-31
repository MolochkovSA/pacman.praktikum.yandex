import { AppRoutes, RoutePath } from '@/shared/config/routeConfig';

export const getProfilePath = (id: string | number) =>
  RoutePath.PROFILE.VIEW.replace(AppRoutes.PROFILE.VIEW, String(id));
