import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../CSS/Register.css";
import { registerUser } from "../Services/authApi";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await registerUser(formData);

      alert(data.message);

      navigate("/login");

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h1>Create Account</h1>

        <p>
          Join MovieMeter today
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Sign Up
          </button>

        </form>

        <p className="auth-switch">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Register;