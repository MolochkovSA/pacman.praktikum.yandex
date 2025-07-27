const isDev = import.meta.env.VITE_MODE;
export const API_PATH: string = import.meta.env.VITE_API_PATH;
export const YANDEX_API_URL: string = import.meta.env.VITE_YANDEX_API_URL;
export const YANDEX_REDIRECT_URL: string = isDev ? 'http://localhost:3000' : import.meta.env.VITE_YANDEX_REDIRECT_URL;
