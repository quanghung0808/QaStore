const express = require("express");
const {
  register,
  checkLoggedIn,
  login,
  updateProfile,
  getAllUser,
} = require("../controller/AuthController");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.get("/users", verifyToken, getAllUser);
router.get("/", verifyToken, checkLoggedIn);
router.post("/register", register);
router.post("/login", login);
router.put("/updateProfile", updateProfile);

module.exports = {
  routes: router,
};
