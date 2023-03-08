import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { playerReducer } from "../reducers/playerReducer";
import {
  ADD_PLAYER,
  apiUrl,
  DELETE_PLAYER,
  FIND_PLAYER,
  PLAYERS_LOADED_FAIL,
  PLAYERS_LOADED_SUCCESS,
  UPDATE_PLAYER,
} from "./constants";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  //State
  const [playerState, dispatch] = useReducer(playerReducer, {
    player: 1,
    players: [],
    playerLoading: true,
  });

  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [showUpdatePlayerModal, setShowUpdatePlayerModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });
  //Get All Player
  const getPlayers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/players`);
      if (response.data.success) {
        dispatch({
          type: PLAYERS_LOADED_SUCCESS,
          payload: response.data.players,
        });
      }
    } catch (error) {
      dispatch({ type: PLAYERS_LOADED_FAIL });
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  //Add Player
  const addPlayer = async (newPlayer, imageUrl) => {
    try {
      const formdata = new FormData();
      formdata.append("name", newPlayer.name);
      formdata.append("position", newPlayer.position);
      formdata.append("nation", newPlayer.nation);
      formdata.append("goals", newPlayer.goals);
      formdata.append("isCaptain", newPlayer.isCaptain);
      formdata.append("description", newPlayer.description);
      formdata.append("image", imageUrl);
      const response = await axios.post(`${apiUrl}/players`, formdata);
      if (response.data.success) {
        dispatch({
          type: ADD_PLAYER,
          payload: response.data.player,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  // Delete player
  const deletePlayer = async (playerId) => {
    try {
      const response = await axios.delete(`${apiUrl}/players/${playerId}`);
      if (response.data.success)
        dispatch({ type: DELETE_PLAYER, payload: playerId });
    } catch (error) {
      console.log(error);
    }
  };

  // //Update Player
  // const updatePlayer = async (updatedPlayer, id) => {
  //   try {
  //     const response = await axios.put(
  //       `${apiUrl}/players/${id}`,
  //       updatedPlayer
  //     );
  //     if (response.data.success)
  //       dispatch({ type: UPDATE_PLAYER, payload: response.data.player });
  //     return response.data;
  //   } catch (error) {
  //     return error.response.data
  //       ? error.response.data
  //       : { success: false, message: "Server Error" };
  //   }
  // };
  //Update Player
  const updatePlayer = async (updatedPlayer, imageUrl, id) => {
    try {
      const formdata = new FormData();
      formdata.append("name", updatedPlayer.name);
      formdata.append("position", updatedPlayer.position);
      formdata.append("nation", updatedPlayer.nation);
      formdata.append("goals", updatedPlayer.goals);
      formdata.append("isCaptain", updatedPlayer.isCaptain);
      formdata.append("description", updatedPlayer.description);
      formdata.append("image", imageUrl);
      formdata.append("id", id);

      const response = await axios.put(`${apiUrl}/players/${id}`, formdata);
      console.log(response);
      if (response.data.success)
        dispatch({ type: UPDATE_PLAYER, payload: response.data.player });
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };
  //Find Player When user updating player
  const findPlayer = (playerId) => {
    const player = JSON.parse(localStorage.getItem("Players")).find(
      (player) => player._id === playerId
    );

    dispatch({ type: FIND_PLAYER, payload: player });
  };

  //Player Context Data
  const playerContextData = {
    playerState,
    getPlayers,
    showAddPlayerModal,
    setShowAddPlayerModal,
    showUpdatePlayerModal,
    setShowUpdatePlayerModal,
    addPlayer,
    showToast,
    setShowToast,
    deletePlayer,
    updatePlayer,
    findPlayer,
  };

  return (
    <PlayerContext.Provider value={playerContextData}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
