import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSearchMovie } from "../../movies-api";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
    const location = useLocation();
    const { url } = useParams(); 
  const [movies, setMovies] = useState(null);

  const searchQuery = new URLSearchParams(location.search).get("query") ?? "";

  const onChangeQuery = (query) => {
    getSearchMovie(query)
      .then(({ data }) => {
        if (data.results.length === 0) {
          toast.error(`There are no movies on your request "${query}"`);
          setMovies([]);
        }
        setMovies(data.results);
      })
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    onChangeQuery(searchQuery); 
  }, [searchQuery]);

  return (
    <section>
      <SearchForm onSubmit={onChangeQuery} />
      {movies && (
        <MovieList movies={movies} url={url} location={location} />
      )}
    </section>
  );
}
