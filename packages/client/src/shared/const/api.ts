export const API_URL: string = import.meta.env.VITE_API_URL;
const host: string = import.meta.env.VITE_SERVER_HOST;
const port: string = import.meta.env.VITE_SERVER_PORT;
export const PACMAN_API_URL: string = `http://${host}:${port}/api/v2`;
