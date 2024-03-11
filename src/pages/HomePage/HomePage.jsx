import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom"; 
import { toast } from "react-toastify";

import { getTrendingMovies } from "../../movies-api";

import MovieList from "../../components/MovieList/MovieList";
import css from './HomePage.module.css'

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const { url } = useParams(); 

  useEffect(() => {
    getTrendingMovies()
      .then(({ data }) => setMovies(data.results))
      .catch((error) =>
        toast.error("Oops, something went wrong...")
      );
  }, []);

  return (
    <section>
      {movies && (
        <>
          <h1 className={css.title}>Trending today</h1>

          <MovieList movies={movies} url={url} location={location} />
        </>
      )}
    </section>
  );
}
