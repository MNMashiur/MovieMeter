export const submitRating = async (data) => {

  const res = await fetch(
    "https://moviemeter-apx3.onrender.com/api/ratings/rate",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(data)
    }
  );

  return res.json();
};

export const getAverageRating = async (movieId) => {

  const res = await fetch(
    `https://moviemeter-apx3.onrender.com/api/ratings/average/${movieId}`
  );

  return res.json();
};