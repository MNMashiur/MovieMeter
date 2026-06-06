export const addReview =
  async (data) => {

    const res = await fetch(

      "http://localhost:5000/api/reviews",

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

export const getReviews =
  async (movieId) => {

    const res = await fetch(

      `http://localhost:5000/api/reviews/${movieId}`
    );

    return res.json();
};