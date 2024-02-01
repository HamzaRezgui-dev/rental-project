import React, { useState } from "react";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/state";
import { useDispatch } from "react-redux";
import axios from "axios";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/auth/login`,
        formData
      );

      /* fetch user info */
      const loggedIn = await response.data;
      console.log(loggedIn);
      if (loggedIn) {
        dispatch(
          login({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="login_content">
        <form onSubmit={handleSubmit} className="login_content_form">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">LOGIN</button>
        </form>
        <a href="/register">Don't have an account? Signin here</a>
      </div>
    </div>
  );
};

export default LoginPage;
