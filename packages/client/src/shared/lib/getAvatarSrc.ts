import { API_URL } from '../const/api';
import defaultAvatar from '@/assets/images/avatar.png';

export function getAvatarSrc(avatar: string | null | undefined) {
  return avatar ? API_URL + '/resources' + avatar : defaultAvatar;
}
