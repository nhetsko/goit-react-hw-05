import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '61e5c5f6228fc4a60c7608f9adf387bd';

  
export const getTrendingMovies = () =>
    axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);

export const getSearchMovie = (query) =>
  axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);

export const getMovieById = (movieId) =>
  axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);

export const getMovieCast = (movieId) =>
  axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);

export const getMovieReviews = (movieId) =>
  axios.get(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
