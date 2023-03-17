import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import {
  apiUrl,
  LOCAL_STORAGE_TOKEN_NAME,
  LOCAL_STORAGE_USER,
} from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });
  //Authenticate the user
  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    localStorage.removeItem("cartItems");

    try {
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      localStorage.removeItem("cartItems");
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  //Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
        localStorage.setItem(
          LOCAL_STORAGE_USER,
          JSON.stringify(response.data.user)
        );
      }

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  //Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success) {
        const res = await axios.post(`${apiUrl}/auth/login`, userForm);
        if (res.data.success) {
          localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
          localStorage.setItem(
            LOCAL_STORAGE_USER,
            JSON.stringify(res.data.user)
          );
        }
      }
      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  //Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    localStorage.removeItem(LOCAL_STORAGE_USER);
    localStorage.removeItem("cartItems");
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
    window.location.reload();
  };

  //Login
  const updateProfile = async (updateProfileForm, id) => {
    try {
      const formdata = new FormData();
      formdata.append("fullname", updateProfileForm.fullname);
      formdata.append("yob", updateProfileForm.yob);
      formdata.append("username", updateProfileForm.username);
      formdata.append("oldPassword", updateProfileForm.oldPassword);
      formdata.append("newPassword", updateProfileForm.newPassword);
      formdata.append("userId", id);
      const response = await axios.put(
        `${apiUrl}/auth/updateProfile`,
        formdata
      );
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  //context data
  const authContextData = {
    updateProfile,
    loginUser,
    registerUser,
    logoutUser,
    authState,
    showToast,
    setShowToast,
  };
  //return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
