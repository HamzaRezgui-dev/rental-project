const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  upload,
} = require("../controllers/authcontroller");

/* USER REGISTER */
router.post("/register", upload.single("profilephoto"), registerUser);
router.post("/login", loginUser);

module.exports = router;
