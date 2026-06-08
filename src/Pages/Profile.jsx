import { useState } from "react";

import "../CSS/Profile.css";

function Profile() {

  // get user safely
  const userData =
    localStorage.getItem("user");

  const storedUser =
    userData &&
    userData !== "undefined"
      ? JSON.parse(userData)
      : null;

  // redirect if not logged in
  if (!storedUser) {

    window.location.href = "/login";

    return null;
  }

  const [editing, setEditing] =
    useState(false);

  const [formData, setFormData] =
    useState({

      firstName:
        storedUser.firstName || "",

      lastName:
        storedUser.lastName || "",

      email:
        storedUser.email || "",

      password: ""
    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(

        `https://moviemeter-apx3.onrender.com/api/auth/update/${storedUser._id}`,

        {

          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const data =
        await response.json();

      // save updated user
      localStorage.setItem(

        "user",

        JSON.stringify(data.user)
      );

      alert("Profile Updated!");

      window.location.reload();

    } catch (err) {

      console.log(err);

    }
  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (

    <div className="profile-container">

      <div className="profile-card">

        <div className="profile-avatar-big">

          {
            storedUser.firstName
              ?.charAt(0)
          }

        </div>

        {

          !editing ? (

            <>

              <h2>

                {storedUser.firstName}{" "}

                {storedUser.lastName}

              </h2>

              <p>
                {storedUser.email}
              </p>

              <button
                className="edit-btn"
                onClick={() =>
                  setEditing(true)
                }
              >
                Edit Profile
              </button>

            </>

          ) : (

            <form
              onSubmit={handleSubmit}
              className="profile-form"
            >

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="New Password"
                onChange={handleChange}
              />

              <button type="submit">

                Save Changes

              </button>

            </form>

          )

        }

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;