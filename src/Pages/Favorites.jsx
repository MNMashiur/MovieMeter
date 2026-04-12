import "../CSS/Favorites.css"
import { useMovieContext } from "../Context/MovieContext";
import MovieCard from "../Components/MovieCard";

function Favorites() {
    const { favorites } = useMovieContext();

    if ((favorites.length > 0)) {
        return (
            <div className="favorites">
                <h2>Your Favorites </h2>
                <div className="movies-grid">
                    {favorites.map((movie) =>
                    (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        );
    } else{
    return <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites list to see them here!</p>
    </div>
    }
}
export default Favorites