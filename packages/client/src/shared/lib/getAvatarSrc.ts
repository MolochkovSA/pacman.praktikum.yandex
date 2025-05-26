import defaultAvatar from '../../assets/images/avatar.png';

const apiUrl: string = import.meta.env.VITE_API_URL;

export function getAvatarSrc(avatar: string | null | undefined) {
  return avatar ? apiUrl + '/resources' + avatar : defaultAvatar;
}
