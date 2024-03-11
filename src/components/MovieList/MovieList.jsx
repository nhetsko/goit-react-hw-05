import React from 'react';
import { Link } from 'react-router-dom';
import css from './MovieList.module.css';
import noImage from '../images/notFound.jpg';

const MovieList = ({ movies, location }) => {
  return (
    <ul className={css.filmList}>
      {movies.map(({ id, poster_path, title }) => (
        <li key={id} className={css.filmItem}>
          <Link
            to={{
              pathname: `/movies/${id}`,
              state: { from: location },
            }}
          >
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : noImage
              }
              alt={title}
            />
            <p className={css.filmTitle}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
