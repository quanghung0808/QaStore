import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  ADD_POST,
  apiUrl,
  DELETE_POST,
  FIND_POST,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  UPDATE_POST,
} from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //State
  const [postState, dispatch] = useReducer(postReducer, {
    post: 1,
    posts: [],
    postLoading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  //Get All Post
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  //Add Post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({
          type: ADD_POST,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success)
        dispatch({ type: DELETE_POST, payload: postId });
    } catch (error) {
      console.log(error);
    }
  };

  //Update Post
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success)
        dispatch({ type: UPDATE_POST, payload: response.data.post });
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  //Find Post When user updating post
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispatch({ type: FIND_POST, payload: post });
  };

  //Post Context Data
  const postContextData = {
    postState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    updatePost,
    findPost,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
