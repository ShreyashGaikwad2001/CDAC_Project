import React, { useState } from "react";
import "./navbar.css";
import { RiParkingBoxFill } from "react-icons/ri";
import { isLoggedIn } from "../../screens/auth/auth";
import { Link } from "react-router-dom";
import {useEffect} from "react";

const Navbar = () => {
  const [loginStatus, setLoginStatus] = useState(!!sessionStorage.getItem("token"));  // !! converts object to boolean

  useEffect(() => {
    const checkLoginStatus = ()=>{setLoginStatus(isLoggedIn())};
    window.addEventListener('storage', checkLoginStatus );
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [loginStatus]);

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div>
          <h1>
            <RiParkingBoxFill className="icon" /> ParkNgo
          </h1>
        </div>
        <div className="navBar">
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="/home" className="navLink">
                Home
              </Link>
            </li>
            <li className="navItem">
              <Link to="#menu" className="navLink">
                Menu
              </Link>
            </li>
            <li className="navItem">
              {
                isLoggedIn()?
                <Link to="/logout" className="navLink">
                  Logout</Link>
                  :
                <div>
                  <Link to="/login" className="navLink">
                    Login
                  </Link>
                  &nbsp;&nbsp;
                  <Link to="/register" className="navLink">
                    Register
                  </Link>
                </div>
              }
            </li>
          </ul>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
