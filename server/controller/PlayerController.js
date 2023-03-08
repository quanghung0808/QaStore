const express = require("express");
const Player = require("../models/Player");

// @route GET api/players
// @desc GET player
// @access Private
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().exec();
    res.json({ success: true, players });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route POST api/players
// @desc Create player
// @access Private
const addPlayer = async (req, res) => {
  const data = req.body;
  try {
    const newPlayer = new Player({
      name: data.name,
      image: data.image,
      nation: data.nation,
      position: data.position,
      goals: data.goals,
      isCaptain: data.isCaptain,
      description: data.description,
    });

    await newPlayer.save();
    res.json({
      success: true,
      message: "Create new player successfully",
      player: newPlayer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route PUT api/players
// @desc PUT player
// @access Private
const updatePlayer = async (req, res) => {
  try {
    const data = req.body;
    const updatePlayer = new Player({
      name: data.name,
      image: data.image,
      nation: data.nation,
      position: data.position,
      goals: data.goals,
      isCaptain: data.isCaptain,
      description: data.description,
    });

    const playerDeleteCondition = { _id: data.id };
    await Player.findOneAndDelete(playerDeleteCondition);
    await updatePlayer.save();
    res.json({
      success: true,
      message: "Update player successfully",
      player: updatePlayer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// @route DELETE api/players
// @desc DELETE player
// @access Private
const deletePlayer = async (req, res) => {
  try {
    const playerDeleteCondition = { _id: req.params.id };
    const deletedPlayer = await Player.findOneAndDelete(playerDeleteCondition);

    // User not authorised to delete the post
    if (!deletedPlayer)
      return res.status(401).json({
        success: false,
        message: "Post not found or User not authorised",
      });
    res.json({
      success: true,
      message: "Delete Successfully!",
      player: deletedPlayer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
};
