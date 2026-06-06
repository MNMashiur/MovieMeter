export const addFavorite =async (data) => {

    const res = await fetch(

      "http://localhost:5000/api/favorites",

      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(data)
      }
    );

    return res.json();
};

export const getFavorites =
  async (userId) => {

    const res = await fetch(

      `http://localhost:5000/api/favorites/${userId}`
    );

    return res.json();
};

export const removeFavorite =
  async (userId, movieId) => {

    const res = await fetch(

      `http://localhost:5000/api/favorites/${userId}/${movieId}`,

      {

        method: "DELETE"
      }
    );

    return res.json();
};