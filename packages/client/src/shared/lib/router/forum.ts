import { AppRoutes, RoutePath } from '@/shared/config/routeConfig';

export const getTopicPath = (id: string | number) =>
  RoutePath.FORUM.TOPIC.ROOT.replace(AppRoutes.FORUM.TOPIC.ROOT, String(id));

export const getTopicEditPath = (id: string | number) =>
  RoutePath.FORUM.TOPIC.EDIT.replace(AppRoutes.FORUM.TOPIC.ROOT, String(id));
