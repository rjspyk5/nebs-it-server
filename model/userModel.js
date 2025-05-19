const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    role: { type: String, default: "user" },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    number: { type: Number },
    photo: { type: String },
    password: { type: String, required: [true, "Password is required"] },
  },
  { timestamps: true }
);

// Hasging password before new user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// create a methods into user model which i can use when i get user data..in user data will have this method also
userSchema.methods.isPasswordMatched = async function (givenPass) {
  return await bcrypt.compare(givenPass, this.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
