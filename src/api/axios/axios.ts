import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000,
  params: {
    include_adult: false,
    language: 'en-US',
    page: 1,
  },
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export default api;
