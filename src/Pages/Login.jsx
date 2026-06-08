import { useState } from "react";
import "../CSS/Login.css";
import { loginUser } from "../Services/authApi";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useMovieContext } from "../Context/MovieContext";

function Login() {

    const navigate =
        useNavigate();

    const {
        refreshUser
    } = useMovieContext();

    const [formData,
        setFormData] = useState({

            email: "",

            password: ""
        });

    //
    // HANDLE INPUT
    //
    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value
            });
        };

    //
    // HANDLE LOGIN
    //
    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const data =
                    await loginUser(
                        formData
                    );

                console.log(data);

                if (data.token) {

                    // save token
                    localStorage.setItem(

                        "token",

                        data.token
                    );

                    // save user
                    localStorage.setItem(

                        "user",

                        JSON.stringify(
                            data.user
                        )
                    );

                    // refresh context
                    refreshUser();

                    alert(
                        "Login Successful!"
                    );

                    navigate("/");

                } else {

                    alert(

                        data.message ||

                        "Login Failed"
                    );
                }

            } catch (err) {

                console.log(err);

                alert(
                    "Something went wrong"
                );
            }
        };

    return (

        <div className="auth-container">

            <div className="auth-box">

                <h1>
                    Log in
                </h1>

                <p>
                    Welcome back to MovieMeter
                </p>

                <form
                    onSubmit={handleSubmit}
                >

                    <input

                        type="email"

                        name="email"

                        placeholder="Email Address"

                        value={formData.email}

                        onChange={handleChange}

                        required
                    />

                    <input

                        type="password"

                        name="password"

                        placeholder="Enter Password"

                        value={formData.password}

                        onChange={handleChange}

                        required
                    />

                    <button
                        type="submit"
                    >

                        Log In

                    </button>

                </form>

                <p className="auth-switch">

                    Don't have an account?{" "}

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;