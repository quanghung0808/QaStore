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
      const response = await axios.get(`${apiUrl}/phones`);
      if (response.data.success) {
        dispatch({
          type: PLAYERS_LOADED_SUCCESS,
          payload: response.data.phones,
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
      formdata.append("price", newPlayer.price);
      formdata.append("category", newPlayer.category);
      formdata.append("os", newPlayer.os);
      formdata.append("size", newPlayer.size);
      formdata.append("pin", newPlayer.pin);
      formdata.append("ram", newPlayer.ram);
      formdata.append("description", newPlayer.description);
      formdata.append("image", imageUrl);
      const response = await axios.post(`${apiUrl}/phones`, formdata);
      if (response.data.success) {
        dispatch({
          type: ADD_PLAYER,
          payload: response.data.phone,
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
      const response = await axios.delete(`${apiUrl}/phones/${playerId}`);
      if (response.data.success)
        dispatch({ type: DELETE_PLAYER, payload: playerId });
    } catch (error) {}
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
      formdata.append("price", updatedPlayer.price);
      formdata.append("category", updatedPlayer.category);
      formdata.append("os", updatedPlayer.os);
      formdata.append("size", updatedPlayer.size);
      formdata.append("pin", updatedPlayer.pin);
      formdata.append("ram", updatedPlayer.ram);
      formdata.append("description", updatedPlayer.description);
      formdata.append("image", imageUrl);
      formdata.append("id", id);

      const response = await axios.put(`${apiUrl}/phones/${id}`, formdata);
      if (response.data.success)
        dispatch({ type: UPDATE_PLAYER, payload: response.data.phone });
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };
  //Find Player When user updating player
  const findPlayer = (playerId) => {
    const player = JSON.parse(localStorage.getItem("Phones")).find(
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
