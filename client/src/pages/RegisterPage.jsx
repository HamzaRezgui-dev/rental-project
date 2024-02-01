import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.scss";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profilephoto: null,
  });
  const [passwordmatch, setPasswordMatch] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profilephoto" ? files[0] : value,
    });
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmpassword ||
        formData.confirmpassword === ""
    );
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerForm = new FormData();
      for (var key in formData) {
        registerForm.append(key, formData[key]);
      }
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        registerForm
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          {!passwordmatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
          <input
            id="image"
            type="file"
            name="profilephoto"
            onChange={handleChange}
            accept="image/*"
            style={{ display: "none" }}
            required
          />
          <label htmlFor="image">
            <img src="assets/addImage.png" alt="add profile pic" />
            <p>Add Profile Photo</p>
          </label>
          {formData.profilephoto && (
            <img
              src={URL.createObjectURL(formData.profilephoto)}
              alt="profile img"
              style={{ width: "100px" }}
            />
          )}
          <button type="submit" disabled={!passwordmatch}>
            REGISTER
          </button>
        </form>
        <a href="/login">Already have an account? Login here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
