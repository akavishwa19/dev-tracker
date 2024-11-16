export const API_URL = import.meta.env.VITE_API_URL || 'https://devtracker-api.letsprogram.in/api';

if (import.meta.env.DEV) {
  console.log('API URL:', API_URL);
  console.log('Environment:', import.meta.env.MODE);
}

export const getApiUrl = (endpoint: string): string => {
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${baseUrl}/${cleanEndpoint}`;
};
