const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// @route GET api/auth
// @desc Check if the user is logged in
// @access public
const checkLoggedIn = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @router POST api/auth/register
// @desc Register user
// @access Public
const register = async (req, res) => {
  const { fullname, username, password, yob } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });

  try {
    // Check for existing users
    const user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already taken" });

    // All good
    const harsedPassword = await argon2.hash(password);
    const newUser = new User({
      fullname,
      username,
      password: harsedPassword,
      yob,
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @router POST api/auth/login
// @desc Login user
// @access Public
const login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });

  try {
    //Check for existing user
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // All good
    // Return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route GET api/auth
// @desc Check if the user is logged in
// @access public
const updateProfile = async (req, res) => {
  const data = req.body;

  try {
    // Check for existing users
    const existUser = await User.findOne({
      _id: { $nin: data.userId },
      username: data.username,
    });
    if (existUser)
      return res
        .status(400)
        .json({ success: false, message: "User already taken" });
    const user = await User.findById(data.userId);

    if (data.oldPassword != "") {
      const validOldPassword = await argon2.verify(
        user.password,
        data.oldPassword
      );
      if (!validOldPassword)
        return res
          .status(400)
          .json({ success: false, message: "Old Password is not correct" });

      // All good
      // Return token
      const passwordUpdate = await argon2.hash(data.newPassword);
      const userUpdate = await User.findByIdAndUpdate(
        { _id: data.userId },
        {
          fullname: data.fullname,
          username: data.username,
          password: passwordUpdate,
          yob: data.yob,
        },
        {
          upsert: true,
          new: true,
        }
      );
      const accessToken = jwt.sign(
        { userId: data.userId },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.json({
        success: true,
        message: "Update user successfully",
        accessToken,
      });
    } else {
      const userUpdate = await User.findByIdAndUpdate(
        { _id: data.userId },
        {
          fullname: data.fullname,
          username: data.username,
          yob: data.yob,
        },
        {
          upsert: true,
          new: true,
        }
      );
      const accessToken = jwt.sign(
        { userId: data.userId },
        process.env.ACCESS_TOKEN_SECRET
      );
      return res.json({
        success: true,
        message: "Update user successfully",
        accessToken,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const getAllUser = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  getAllUser,
  updateProfile,
  register,
  checkLoggedIn,
  login,
};
