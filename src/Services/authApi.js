export const registerUser = async (data) => {
  const res = await fetch(
    "https://moviemeter-apx3.onrender.com/api/auth/register",
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

export const loginUser = async (data) => {
  const res = await fetch(
    "https://moviemeter-apx3.onrender.com/api/auth/login",
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