import {
  ADD_NATION,
  DELETE_NATION,
  FIND_NATION,
  NATIONS_LOADED_FAIL,
  NATIONS_LOADED_SUCCESS,
  UPDATE_NATION,
} from "../contexts/constants";

export const nationReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case NATIONS_LOADED_SUCCESS:
      localStorage.setItem("Categories", JSON.stringify(payload));

      return {
        ...state,
        nations: payload,
        nationsLoading: false,
      };
    case NATIONS_LOADED_FAIL:
      return {
        ...state,
        nations: [],
        nationsLoading: false,
      };
    case ADD_NATION:
      return {
        ...state,
        nations: [...state.nations, payload],
      };
    case DELETE_NATION:
      return {
        ...state,
        nations: state.nations.filter((nation) => nation._id !== payload),
      };
    case FIND_NATION:
      localStorage.setItem("CategoryDetail", JSON.stringify(payload));

      return {
        ...state,
        nation: payload,
      };
    case UPDATE_NATION:
      const newNations = state.nations.map((nation) =>
        nation._id === payload._id ? payload : nation
      );
      return {
        ...state,
        nations: newNations,
      };
    default:
      return state;
  }
};
