const express = require("express");
const {
  getAllPhones,
  addPhone,
  updatePhone,
  deletePhone,
} = require("../controller/PhoneController");

const verifyToken = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllPhones);
router.post("/", verifyToken, addPhone);
router.put("/:id", verifyToken, updatePhone);
router.delete("/:id", verifyToken, deletePhone);

module.exports = {
  routes: router,
};
