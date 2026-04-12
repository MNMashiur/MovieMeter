import "../CSS/MovieCard.css"
import { useMovieContext } from "../Context/MovieContext";
import { useState } from "react";

function MovieCard({ movie }) {

    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()

    const favorite = isFavorite(movie.id)

    const [animate, setAnimate] = useState(false);

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) {
            removeFromFavorites(movie.id)
        } else {
            addToFavorites(movie)
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
        }
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button
                        className={`favorite-btn 
                        ${favorite ? "active" : ""} 
                        ${animate ? "pop" : ""}`}
                        onClick={onFavoriteClick}
                        >
                        {favorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>

            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    );
}

export default MovieCard
