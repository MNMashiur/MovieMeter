export const addReview =
  async (data) => {

    const res = await fetch(

      "https://moviemeter-apx3.onrender.com/api/reviews",

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

      `https://moviemeter-apx3.onrender.com/api/reviews/${movieId}`
    );

    const data =
      await res.json();

    console.log(data);

    return data;
  };