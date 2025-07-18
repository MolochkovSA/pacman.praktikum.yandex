export const API_URL: string = import.meta.env.VITE_API_URL;
const host: string = import.meta.env.VITE_SERVER_HOST;
const port: string = import.meta.env.VITE_SERVER_PORT;

// Если режим разработки, используем localhost:port, иначе отправляем все запросы на nginx, а тот в свою очередь маршрутизирует их
export const PACMAN_API_URL: string = import.meta.env.VITE_MODE === 'development' ? `${host}:${port}/api/v2` :  `${host}/api/v2`;
