import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Search, Menu, Person } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/state";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [dropdownmenu, setDropdownmenu] = useState(false);
  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="" />
      </a>
      <div className="navbar_search">
        <input type="text" placeholder="Search..." />
        <IconButton>
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>
      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Become a Host
          </a>
        ) : (
          <a href="/login" className="host">
            Become a Host
          </a>
        )}
        <button
          className="navbar_right_account"
          onClick={() => setDropdownmenu(!dropdownmenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`${
                process.env.REACT_APP_BACKEND_ENDPOINT
              }/${user.profilephotoPath.replace("public", "")}`}
              alt="profilephoto"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          )}
        </button>
        {dropdownmenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}

        {dropdownmenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to="/trips">Trip List</Link>
            <Link to="/wishes">Wish List</Link>
            <Link to="/properties">Property List</Link>
            <Link to="/reservations">Reservation List</Link>
            <Link to="/create-listing">Become a Host</Link>
            <Link
              to="/login"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
