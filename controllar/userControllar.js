const User = require("../model/userModel");
const database = require("../services/database");
const genarateToken = require("../utils/genarateToken");

const userControllar = {
  login: async (req, res, next) => {
    const credentials = req.body;
    try {
      const result = await User.findOne({ email: credentials?.email });
      const isPasswordMatched = await result.isPasswordMatched(
        credentials?.password
      );
      if (!isPasswordMatched)
        return res
          .status(400)
          .send({ message: "Password didn't match", success: false });
      const token = genarateToken({ email: credentials?.email });
      res
        .status(200)
        .send({ success: true, message: "Successfully Login", token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  register: async (req, res, next) => {
    const data = req.body;
    try {
      const result = await database.create(User, data);
      res.status(200).send({
        success: true,
        message: "registration successfull",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  changePassword: async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const id = req.params.id;

    try {
      const user = await User.findById(id);
      const isMatched = user.isPasswordMatched(oldPassword);
      if (!isMatched)
        return res
          .status(400)
          .send({ success: false, message: "Password not matched" });
      const result = await User.updateOne(
        { _id: id },
        { password: newPassword }
      );
      if (result?.modifiedCount) {
        return res.send({ message: "Password change sccessfully" });
      } else {
        return res.send({
          message: "Your given data and previous data is same",
        });
      }
    } catch (error) {
      next(error);
    }
  },
  updateProfile: async (req, res, next) => {
    const data = req?.body;
    const id = req.params.id;
    const query = { _id: id };
    try {
      const result = await User.updateOne(query, data, {
        runValidators: true,
      });
      if (result?.modifiedCount) {
        return res.send({
          message: "Profile Update Successfully",
          success: true,
        });
      } else {
        return res.send({
          message: "Your given data and previous data is same",
          success: false,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const result = await User.find();
      return res.send({
        message: "User data retrive Successfully",
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
  getUser: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await User.findOne({ _id: id });
      return res.send({
        message: "User data retrive Successfully",
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userControllar;
