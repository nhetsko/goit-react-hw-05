import { Suspense, lazy } from "react";

import { Route, Routes } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

// const HomePage = lazy(() => import("../pages/HomePage"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MoviesDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));


export default function App() {
    return (
        <div>
            <Navigation />
             <Suspense fallback={<div>LOADING PAGE...</div>}>
            <Routes>
                <Route path="/" element={ <HomePage/>} />
                <Route path="/movies" element={<MoviesPage/> } />
                <Route path="/movies/:movieId" element={<MoviesDetailsPage />}>
                    <Route path="cast" element={<MovieCast/>} />
                    <Route path="reviews" element={<MovieReviews />} />
                </Route> 
                <Route path="*" element={<NotFoundPage />} />
                </Routes>
                </Suspense>
        </div>
    )
}