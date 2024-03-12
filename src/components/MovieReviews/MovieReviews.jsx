import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getMovieReviews } from "../../movies-api";
import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";

const { reviewList, reviewItem, reviewAuthor, reviewText } = css;

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId)
      .then(({ data }) => {
        if (data.results.length === 0) {
          toast.info("Sorry, reviews are not available");
        }
        setReviews(data.results);
      })
      .catch((error) =>
        toast.error("Oops, something went wrong...")
      );
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={reviewList}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={reviewItem}>
              <h3 className={reviewAuthor}>{`Author: ${author}`}</h3>
              <p className={reviewText}>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We do not have any reviews for this movie.</p>
      )}
    </>
  );
};

export default MovieReviews;
