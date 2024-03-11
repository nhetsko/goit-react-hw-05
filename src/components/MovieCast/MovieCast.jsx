import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getMovieCast } from "../../movies-api";
import css from './MovieCast.module.css'
import noImage from "../images/notFound.jpg";

export default function MovieCast ({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    getMovieCast(movieId)
      .then(({ data }) => {
        if (data.cast.length === 0) {
          toast.info("Sorry, cast information is not available");
        } else {
          setCast(data.cast);
        }
      })
      .catch((error) =>
        toast.error("Oops, something went wrong...")
      );
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul className={css.castList}>
          {cast.map(({ id, profile_path, name, character }) => (
            <li key={id} className={css.castItem}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300/${profile_path}`
                    : noImage
                }
              />
              <p className={css.castInformation}>{name}</p>
              <p className={css.castInformation}>{character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
