const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilephotoPath: { type: String, default: "" },
    tripList: { type: Array, default: [] },
    wishList: { type: Array, default: [] },
    propertyList: { type: Array, default: [] },
    reservationList: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
