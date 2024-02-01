const bcrypt = require("bcryptjs");
const multer = require("multer");
const User = require("../models/User");

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

const registerUser = async (req, res) => {
  try {
    /* Take all information from the form */
    const { firstname, lastname, email, password } = req.body;

    /* The uploaded file is available as req.file */
    const profilephoto = req.file;

    if (!profilephoto) {
      return res.status(400).send("No file uploaded");
    }

    /* path to the uploaded profile photo */
    const profilephotoPath = profilephoto.path;

    /* Check if user exists */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    /* Hash the password */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    /* Create a new User */
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profilephotoPath,
    });

    /* Save the new User */
    await newUser.save();

    /* Send a successful message */
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
};

module.exports = { registerUser, upload };
