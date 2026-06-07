import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import "../CSS/MovieDetails.css";

import { addReview, getReviews } from "../Services/reviewApi";

function MovieDetails() {

    const { id } = useParams();

    const [movie, setMovie] = useState(null);

    const [credits, setCredits] = useState(null);

    const [loading, setLoading] = useState(true);

    const [reviews, setReviews] = useState([]);

    const [averageRating, setAverageRating] = useState(0);

    const [reviewText, setReviewText] = useState("");

    const [rating, setRating] = useState(5);

    useEffect(() => {

        const fetchMovie = async () => {

            try {

                // movie details
                const movieRes =
                    await fetch(

                        `https://api.themoviedb.org/3/movie/${id}?api_key=31f65943fe7a7e0b82b34b360e7c147b`
                    );

                const reviewData = await getReviews(id);

                setReviews(reviewData.reviews);

                setAverageRating(<reviewData className="averageRating"></reviewData>);

                const movieData =
                    await movieRes.json();

                // credits
                const creditsRes =
                    await fetch(

                        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=31f65943fe7a7e0b82b34b360e7c147b`
                    );

                const creditsData =
                    await creditsRes.json();

                setMovie(movieData);

                setCredits(creditsData);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);
            }
        };

        fetchMovie();

    }, [id]);

    if (loading) {

        return <h1>Loading...</h1>;
    }

    const director =
        credits?.crew?.find(

            (person) =>
                person.job === "Director"
        );

    const handleReviewSubmit =
        async () => {

            const token =
                localStorage.getItem("token");

            if (!token) {

                window.location.href =
                    "/login";

                return;
            }

            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );

            await addReview({

                movieId: Number(id),

                userId: user._id,

                rating,

                review: reviewText
            });

            window.location.reload();
        };

    return (

        <div className="movie-details">

            <div
                className="backdrop"
                style={{
                    backgroundImage:

                        movie?.backdrop_path

                            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`

                            : "none"
                }}
            >

                <div className="overlay">

                    <div className="movie-content">

                        <img

                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}

                            alt={movie.title}

                            className="details-poster"
                        />

                        <div className="details-info">

                            <h1>
                                {movie.title}
                            </h1>

                            <div className="movie-meta">

                                <span>
                                    {movie.release_date}
                                </span>

                                <span>
                                    {movie.runtime} min
                                </span>

                                <span>
                                    {
                                        movie.genres
                                            ?.map(g => g.name)
                                            .join(", ")
                                    }
                                </span>

                            </div>

                            <p className="overview">

                                {movie.overview}

                            </p>

                            <p>

                                <strong>
                                    Director:
                                </strong>

                                {" "}

                                {director?.name || "Unknown"}

                            </p>

                            <p>

                                <strong>
                                    Cast:
                                </strong>

                                {" "}

                                {
                                    credits?.cast
                                        ?.slice(0, 8)
                                        ?.map(actor => actor.name)
                                        ?.join(", ")
                                }

                            </p>

                        </div>

                        <div className="reviews-section">

                            <h2>

                                ⭐ {averageRating}

                                / 5 User Rating

                            </h2>

                            <div className="review-form">

                                <textarea

                                    placeholder="Write your review..."

                                    value={reviewText}

                                    onChange={(e) =>

                                        setReviewText(e.target.value)
                                    }
                                />

                                <select

                                    value={rating}

                                    onChange={(e) =>

                                        setRating(e.target.value)
                                    }
                                >

                                    <option value="1">1 ⭐</option>
                                    <option value="2">2 ⭐</option>
                                    <option value="3">3 ⭐</option>
                                    <option value="4">4 ⭐</option>
                                    <option value="5">5 ⭐</option>

                                </select>

                                <button
                                    onClick={handleReviewSubmit}
                                >
                                    Submit Review
                                </button>

                            </div>

                            <div className="reviews-list">

                                {

                                    reviews.map((review) => (

                                        <div
                                            key={review._id}
                                            className="review-card"
                                        >

                                            <h3>

                                                {review.anonymousName}

                                            </h3>

                                            <p>

                                                {"⭐".repeat(review.rating)}

                                            </p>

                                            <p>

                                                {review.review}

                                            </p>

                                        </div>
                                    ))
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default MovieDetails;