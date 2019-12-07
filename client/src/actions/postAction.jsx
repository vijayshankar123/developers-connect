import axios from "axios";
import { setAlert } from "./alertAction";
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./types";

//Get posts

export const getPosts = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/posts");
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//get post by id

export const getPost = id => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/posts/" + id);
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//add a like
export const addLike = postid => {
  return async dispatch => {
    try {
      const res = await axios.put("/api/posts/like/" + postid);
      dispatch({
        type: UPDATE_LIKES,
        payload: { postid, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//remove a like
export const removeLike = postid => {
  return async dispatch => {
    try {
      const res = await axios.put("/api/posts/unlike/" + postid);
      dispatch({
        type: UPDATE_LIKES,
        payload: { postid, likes: res.data }
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//Delete post
export const deletePost = id => {
  return async dispatch => {
    try {
      const res = await axios.delete("/api/posts/" + id);
      dispatch({
        type: DELETE_POST,
        payload: id
      });

      dispatch(setAlert("Post removed", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};
//Add a  post
export const addPost = formData => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/posts", formData, config);
      dispatch({
        type: ADD_POST,
        payload: res.data
      });

      dispatch(setAlert("Post created", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//add a comment
export const addComment = (postid, formData) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post(
        "/api/posts/comment/" + postid,
        formData,
        config
      );
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });

      dispatch(setAlert("Comment added", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//delete comment
export const deleteComment = (postid, commentid) => {
  return async dispatch => {
    try {
      const res = await axios.delete(
        "/api/posts/comment/" + postid + "/" + commentid
      );
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentid
      });

      dispatch(setAlert("Comment deleted", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};
