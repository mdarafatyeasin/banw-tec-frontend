import { Link, useNavigate } from "react-router-dom";
import "./Doctor.css"; // Make sure to import the CSS file
import Loader from "../../Loader/Loader";
import { useState } from "react";

const Patient = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegistration = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const email = form.email.value;
    const profile_picture = form.profile_picture.value;
    const address = form.address.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;

    // Prepare the request body
    const requestBody = {
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      confirm_password: confirm_password,
      profile_picture: profile_picture,
      role: "patent",
      address: address,
    };

    // Request options for the fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    };

    // Make the fetch request
    fetch(
      "https://banaw-tec-backend.onrender.com/api/auth/registration",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        navigate("/login");
        console.log("Data received:", data);
      })
      .catch((error) => console.error("Error:", error));
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="doctor-registration-container">
      <form className="doctor-registration-form" onSubmit={handleRegistration}>
        <h1 className="doctor-registration-title">Patient Registration</h1>
        <div className="doctor-input-box">
          <input type="text" name="username" placeholder="Username" required />
        </div>
        <div className="doctor-name-section">
          <div className="doctor-input-box">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              required
            />
          </div>
          <div className="doctor-input-box">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              required
            />
          </div>
        </div>
        <div className="doctor-input-box">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="doctor-input-box">
          <input
            type="url"
            name="profile_picture"
            placeholder="Profile Picture Link"
            required
          />
        </div>
        <div className="doctor-input-box">
          <input type="text" name="address" placeholder="Address" required />
        </div>
        <div className="doctor-input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="doctor-input-box">
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="doctor-remember-forgot">
          <label>
            <input type="checkbox" />
            Accept terms and conditions.
          </label>
        </div>
        <input
          className="doctor-registration-button"
          type="submit"
          value="Register"
        />
        <div className="doctor-login-link">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Patient;
