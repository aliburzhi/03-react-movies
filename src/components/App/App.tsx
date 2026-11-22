import './App.module.css';
import { SearchBar } from '../SearchBar/SearchBar.tsx';
import { useState } from 'react';
import { fetchMovies } from '../../services/movieService.ts';
import type { Movie } from '../../types/movie.ts';
import { toast } from 'react-hot-toast';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import MovieModal from '../MovieModal/MovieModal.tsx';
import MovieGrid from '../MovieGrid/MovieGrid.tsx';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = async (search: string) => {
    setMovies([]);
    setLoading(true);
    setError(false);

    try {
      const result = await fetchMovies(search);
      if (!result.length) {
        toast.error('No movies found for your request.');
        return;
      }
      setMovies(result);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
