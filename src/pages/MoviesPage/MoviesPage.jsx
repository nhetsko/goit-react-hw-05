import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSearchMovie } from "../../movies-api";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { url } = useParams();

  const searchQuery = searchParams.get("query") ?? "";

  const onChangeQuery = (query) => {
    setSearchParams({ query });
  };

  useEffect(() => {
    if (!searchQuery) {
      setMovies(null); 
      return;
    }

    getSearchMovie(searchQuery)
      .then(({ data }) => {
        if (data.results.length === 0) {
          toast.error(`There are no movies on your request "${searchQuery}"`);
          setMovies([]);
        } else {
          setMovies(data.results);
        }
      })
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
  }, [searchQuery, setMovies]);

  return (
    <section>
      <SearchForm onSubmit={onChangeQuery} />
      {movies && <MovieList movies={movies} url={url} />}
    </section>
  );
}
