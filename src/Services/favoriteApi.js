export const addFavorite =async (data) => {

    const res = await fetch(

      "https://moviemeter-apx3.onrender.com/api/favorites",

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

      `https://moviemeter-apx3.onrender.com/api/favorites/${userId}`
    );

    return res.json();
};

export const removeFavorite =
  async (userId, movieId) => {

    const res = await fetch(

      `https://moviemeter-apx3.onrender.com/api/favorites/${userId}/${movieId}`,

      {

        method: "DELETE"
      }
    );

    return res.json();
};