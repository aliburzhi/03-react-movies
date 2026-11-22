import type { Movie } from '../types/movie.ts';
import api from '../api/axios/axios.ts';

interface FetchMovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(search: string): Promise<Movie[]> {
  const response = await api.get<FetchMovieResponse>('/search/movie', {
    params: { query: search },
  });

  return response.data.results;
}
