const express = require("express");
const {
  getAllPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
} = require("../controller/PlayerController");

const verifyToken = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllPlayers);
router.post("/", verifyToken, addPlayer);
router.put("/:id", verifyToken, updatePlayer);
router.delete("/:id", verifyToken, deletePlayer);

module.exports = {
  routes: router,
};
