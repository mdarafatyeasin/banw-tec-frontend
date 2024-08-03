import "./Navbar.css";
import { useEffect, useState } from "react";
// icons
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMobile, setisMobile] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isDoctor, setIsDoctor] = useState(false);
  const user = localStorage.getItem("user");


  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);


  useEffect(() => {
    if (userData) {
      // Check if the user role is doctor
      if (userData.additional_info && userData.additional_info.role === "doctor") {
        setIsDoctor(true);
      } else {
        setIsDoctor(false);
      }
    }
  }, [userData]);

  // console.log(userData.user.id);

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        Our Health
      </NavLink>
      <ul
        onClick={() => setisMobile(true)}
        className={isMobile ? "nav-links" : "nav-links-mobile"}
      >
        <li className="link-option">
          <NavLink to="/home">Home</NavLink>
        </li>
        <li className="link-option">
          <NavLink to="/blogs">Blog</NavLink>
        </li>
        <li className="link-option">
          {user ? (
            <NavLink to="/dashboard">Dashboard</NavLink>
          ) : (
            <div className="auth-section">
              <NavLink to="/login">
                <p>Login</p>
              </NavLink>
              <NavLink to="/signup">
                <p>Sign Up</p>
              </NavLink>
            </div>
          )}
        </li>
        <li className="link-option">
          {isDoctor ? (
            <NavLink to="/blogs/post">Post Blog</NavLink>
          ) : <></>}
        </li>
      </ul>
      <button
        className="mobile-menu-icon"
        onClick={() => setisMobile(!isMobile)}
      >
        {isMobile ? <IoMenu size={40} /> : <RxCross2 size={40} />}
      </button>
    </nav>
  );
};

export default Navbar;
