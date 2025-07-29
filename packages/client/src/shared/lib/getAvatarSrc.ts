import defaultAvatar from '@/assets/images/avatar.png';
import { API_PATH } from '../const/api';

export function getAvatarSrc(avatar: string | null | undefined) {
  return avatar ? `${API_PATH}/resources` + avatar : defaultAvatar;
}
