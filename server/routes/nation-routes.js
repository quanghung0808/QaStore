const express = require("express");
const {
  getAllNations,
  addNation,
  updateNation,
  deleteNation,
} = require("../controller/NationController");

const verifyToken = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllNations);
router.post("/", verifyToken, addNation);
router.put("/:id", verifyToken, updateNation);
router.delete("/:id", verifyToken, deleteNation);

module.exports = {
  routes: router,
};
