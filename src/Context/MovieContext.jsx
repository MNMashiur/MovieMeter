import { createContext, useState, useEffect, useContext } from "react";

import { addFavorite, getFavorites, removeFavorite } from "../Services/favoriteApi";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {

    const [favorites, setFavorites] =
        useState([]);

    const [user, setUser] =
        useState(null);

    //
    // LOAD USER
    //
    useEffect(() => {

        const userData =
            localStorage.getItem("user");

        if (

            userData &&

            userData !== "undefined"

        ) {

            setUser(
                JSON.parse(userData)
            );
        }

    }, []);

    //
    // LOAD FAVORITES
    //
    useEffect(() => {

        const loadFavorites =
            async () => {

                try {

                    if (!user) {

                        setFavorites([]);

                        return;
                    }

                    const data =
                        await getFavorites(
                            user.id
                        );

                    // extract movie data
                    const movies =
                        data.map(

                            item =>
                                item.movieData
                        );

                    setFavorites(movies);

                } catch (err) {

                    console.log(err);
                }
            };

        loadFavorites();

    }, [user]);

    //
    // ADD FAVORITE
    //
    const addToFavorites =
        async (movie) => {

            try {

                if (!user) {

                    window.location.href =
                        "/login";

                    return;
                }

                // avoid duplicates
                const alreadyExists =
                    favorites.some(

                        fav =>
                            fav.id === movie.id
                    );

                if (alreadyExists) {

                    return;
                }

                // save to MongoDB
                await addFavorite({

                    userId: user.id,

                    movieId: movie.id,

                    movieData: movie
                });

                // update frontend
                setFavorites(prev => [

                    ...prev,

                    movie
                ]);

            } catch (err) {

                console.log(err);
            }
        };

    //
    // REMOVE FAVORITE
    //
    const removeFromFavorites =
        async (movieId) => {

            try {

                if (!user) return;

                // remove from MongoDB
                await removeFavorite(

                    user.id,

                    movieId
                );

                // update frontend
                setFavorites(prev =>

                    prev.filter(

                        movie =>
                            movie.id !== movieId
                    )
                );

            } catch (err) {

                console.log(err);
            }
        };

    //
    // CHECK FAVORITE
    //
    const isFavorite =
        (movieId) => {

            return favorites.some(

                movie =>
                    movie.id === movieId
            );
        };

    //
    // REFRESH USER AFTER LOGIN
    //
    const refreshUser =
        () => {

            const userData =
                localStorage.getItem("user");

            if (

                userData &&

                userData !== "undefined"

            ) {

                setUser(
                    JSON.parse(userData)
                );
            }
        };

    const value = {

        favorites,

        setFavorites,

        addToFavorites,

        removeFromFavorites,

        isFavorite,

        refreshUser
    };

    return (

        <MovieContext.Provider
            value={value}
        >

            {children}

        </MovieContext.Provider>
    );
};

export default MovieContext;