import {
  ADD_PLAYER,
  DELETE_PLAYER,
  FIND_PLAYER,
  PLAYERS_LOADED_FAIL,
  PLAYERS_LOADED_SUCCESS,
  UPDATE_PLAYER,
} from "../contexts/constants";

export const playerReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PLAYERS_LOADED_SUCCESS:
      localStorage.setItem("Players", JSON.stringify(payload));
      return {
        ...state,
        players: payload,
        playersLoading: false,
      };
    case PLAYERS_LOADED_FAIL:
      return {
        ...state,
        players: [],
        playersLoading: false,
      };
    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, payload],
      };
    case DELETE_PLAYER:
      return {
        ...state,
        players: state.players.filter((player) => player._id !== payload),
      };
    case FIND_PLAYER:
      localStorage.setItem("PlayerDetail", JSON.stringify(payload));

      return {
        ...state,
        player: payload,
      };
    case UPDATE_PLAYER:
      const newPlayers = state.players.map((player) =>
        player._id === payload._id ? payload : player
      );
      return {
        ...state,
        players: newPlayers,
      };
    default:
      return state;
  }
};
