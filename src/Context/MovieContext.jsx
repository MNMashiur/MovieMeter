import { createContext, useState, useEffect, useContext } from "react";

import { addFavorite, getFavorites, removeFavorite } from "../Services/favoriteApi";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([]);

    //
    // LOAD FAVORITES FROM DATABASE
    //
    useEffect(() => {

        const loadFavorites =
            async () => {

                try {

                    const userData =
                        localStorage.getItem("user");

                    if (
                        !userData ||
                        userData === "undefined"
                    ) return;

                    const user =
                        JSON.parse(userData);

                    const data =
                        await getFavorites(user.id);

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

    }, []);

    //
    // ADD FAVORITE
    //
    const addToFavorites =
        async (movie) => {

            try {

                const userData =
                    localStorage.getItem("user");

                if (
                    !userData ||
                    userData === "undefined"
                ) return;

                const user =
                    JSON.parse(userData);

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

                const userData =
                    localStorage.getItem("user");

                if (
                    !userData ||
                    userData === "undefined"
                ) return;

                const user =
                    JSON.parse(userData);

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

    const value = {

        favorites,

        setFavorites,

        addToFavorites,

        removeFromFavorites,

        isFavorite
    };

    return (

        <MovieContext.Provider
            value={value}
        >

            {children}

        </MovieContext.Provider>
    );
};