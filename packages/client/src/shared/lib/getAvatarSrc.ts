import defaultAvatar from '@/assets/images/avatar.png';

export function getAvatarSrc(avatar: string | null | undefined) {
  return avatar ? '/api/v2/resources' + avatar : defaultAvatar;
}
