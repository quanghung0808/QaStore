import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { nationReducer } from "../reducers/nationReducer";
import {
  ADD_NATION,
  apiUrl,
  DELETE_NATION,
  FIND_NATION,
  NATIONS_LOADED_FAIL,
  NATIONS_LOADED_SUCCESS,
  UPDATE_NATION,
} from "./constants";

export const NationContext = createContext();

const NationContextProvider = ({ children }) => {
  //State
  const [nationState, dispatch] = useReducer(nationReducer, {
    nation: 1,
    nations: [],
    nationLoading: true,
  });

  const [showAddNationModal, setShowAddNationModal] = useState(false);
  const [showUpdateNationModal, setShowUpdateNationModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  //Get All Nation
  const getNations = async () => {
    try {
      const response = await axios.get(`${apiUrl}/nations`);
      if (response.data.success) {
        dispatch({
          type: NATIONS_LOADED_SUCCESS,
          payload: response.data.nations,
        });
      }
    } catch (error) {
      dispatch({ type: NATIONS_LOADED_FAIL });
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  //Add Nation
  const addNation = async (newNation, imageUrl) => {
    try {
      const formdata = new FormData();
      formdata.append("name", newNation.name);
      formdata.append("rank", newNation.rank);
      formdata.append("description", newNation.description);
      formdata.append("image", imageUrl);
      const response = await axios.post(`${apiUrl}/nations`, formdata);
      if (response.data.success) {
        dispatch({
          type: ADD_NATION,
          payload: response.data.nation,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  // Delete nation
  const deleteNation = async (nationId) => {
    try {
      const response = await axios.delete(`${apiUrl}/nations/${nationId}`);
      if (response.data.success)
        dispatch({ type: DELETE_NATION, payload: nationId });
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      console.log(error);
    }
  };

  // //Update Nation
  // const updateNation = async (updatedNation, id) => {
  //   try {
  //     const response = await axios.put(
  //       `${apiUrl}/nations/${id}`,
  //       updatedNation
  //     );
  //     if (response.data.success)
  //       dispatch({ type: UPDATE_NATION, payload: response.data.nation });
  //     return response.data;
  //   } catch (error) {
  //     return error.response.data
  //       ? error.response.data
  //       : { success: false, message: "Server Error" };
  //   }
  // };
  //Update Nation
  const updateNation = async (updatedNation, imageUrl, id) => {
    try {
      const formdata = new FormData();
      formdata.append("name", updatedNation.name);
      formdata.append("rank", updatedNation.rank);
      formdata.append("description", updatedNation.description);
      formdata.append("image", imageUrl);
      formdata.append("id", id);

      const response = await axios.put(`${apiUrl}/nations/${id}`, formdata);
      console.log(response);
      if (response.data.success)
        dispatch({ type: UPDATE_NATION, payload: response.data.nation });
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };
  //Find Nation When user updating nation
  const findNation = (nationId) => {
    const nation = JSON.parse(localStorage.getItem("Nations")).find(
      (nation) => nation._id === nationId
    );
    dispatch({ type: FIND_NATION, payload: nation });
  };

  //Nation Context Data
  const nationContextData = {
    nationState,
    getNations,
    showAddNationModal,
    setShowAddNationModal,
    showUpdateNationModal,
    setShowUpdateNationModal,
    addNation,
    showToast,
    setShowToast,
    deleteNation,
    updateNation,
    findNation,
  };

  return (
    <NationContext.Provider value={nationContextData}>
      {children}
    </NationContext.Provider>
  );
};

export default NationContextProvider;
