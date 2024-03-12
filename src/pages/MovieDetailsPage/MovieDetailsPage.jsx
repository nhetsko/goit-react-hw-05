import { useState, useEffect} from "react";
import clsx from "clsx";
import { useLocation, useParams, NavLink, Link, Routes, Route } from "react-router-dom"; 
import { toast } from "react-toastify";
import { getMovieById } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";
import noImage from '../../components/images/notFound.jpg';
import MovieCast from "../../components/MovieCast/MovieCast"; 
import MovieReviews from "../../components/MovieReviews/MovieReviews";

export default function MoviesDetailsPage() {
  
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const location = useLocation();
  const backLinkRef = location.state?.from ?? "/movies";


  useEffect(() => {
    getMovieById(movieId)
      .then(({ data }) => {
        setMovie(data);
      })
      .catch((error) =>
        toast.error("Oops, something went wrong...")
      );
  }, [movieId]);


  const { poster_path, title, genres, vote_average, overview } = movie;

  const makeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};


  return (
    <section className={css.section}>
      <Link to={backLinkRef}>Go back</Link>

      <div className={css.filmContainer}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : noImage
          }
          alt={title}
          width="350"
        />
        <div className={css.filmDescription}>
          <h1 className={css.filmTitle}>{title}</h1>
          <p className={css.filmText}>
            <span className={css.userSore}>User Score:</span>{" "}
            {vote_average * 10}%
          </p>
          <h2 className={css.filmCaption}>Overview</h2>
          <p className={css.filmText}>{overview}</p>
          {genres && (
            <>
              <h3 className={css.filmCaption}>Genres</h3>
              <ul>
                {genres.map(({ id, name }) => (
                  <li key={id}>
                    <p>{name}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <nav className={css.navigation}>
        <h3 className={css.navigationTitle}>Additional information</h3>
        <ul className={css.navList}>
          <li>
            <NavLink className={makeLinkClass} to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink className={makeLinkClass} to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="cast" element={<MovieCast movieId={movieId} />} />
         <Route path="reviews" element={<MovieReviews movieId={movieId} />} />
      </Routes>
    </section>
  );
}
