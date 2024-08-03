import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../Loader/Loader";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;

    // Prepare the request body
    const requestBody = {
      username: username,
      password: password,
    };

    // Request options for the fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };

    // Make the fetch request
    fetch("https://banaw-tec-backend.onrender.com/api/auth/login/", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        setError(data.error);
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard", { data: data });
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        setError("Login failed. Please check your credentials and try again.");
        console.log(error);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="login-page">
      <div className="login-content">
        <h1 className="login-title">Login</h1>
        <div>
          {error && (
            <ul className="error-message">
              <li>{error}</li>
            </ul>
          )}
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              aria-label="Username"
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              aria-label="Password"
            />
          </div>
          <div className="remember-forgot">
            <label className="remember-label">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/login/forgot_password" className="forgot-link">
              Forgot password?
            </Link>
          </div>
          <input className="login-button" type="submit" value="Login" />
          <div className="register-link">
            <p>
              Dont have an account?{" "}
              <Link to="/signup" className="register-link">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
