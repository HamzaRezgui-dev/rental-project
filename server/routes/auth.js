const express = require("express");
const router = express.Router();
const { registerUser, upload } = require("../controllers/authcontroller");

/* USER REGISTER */
router.post("/register", upload.single("profilephoto"), registerUser);

module.exports = router;
