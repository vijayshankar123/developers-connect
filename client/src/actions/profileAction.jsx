import axios from "axios";
import { setAlert } from "./alertAction";

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS
} from "./types";

//get all profiles
export const getProfiles = () => {
  return async dispatch => {
    dispatch({
      type: CLEAR_PROFILE
    });
    try {
      const res = await axios.get("/api/profile");
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//get profile by user id
export const getProfileById = userId => {
  return async dispatch => {
    dispatch({
      type: CLEAR_PROFILE
    });
    try {
      const res = await axios.get("/api/profile/user/" + userId);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//get github repos
export const getGithubRepos = username => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/profile/github/" + username);
      dispatch({
        type: GET_REPOS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//get current users profile

export const getCurrentProfile = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/profile/me");
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//create or update profile

export const createProfile = (formData, history, edit = false) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });

      dispatch(
        setAlert(edit ? "Profile updated" : "Profile created", "success")
      );

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//Add experience
export const addExperience = (formData, history) => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put("/api/profile/experience", formData, config);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert("EXPERIENCE ADDED", "success"));

      history.push("/dashboard");
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//Add education
export const addEducation = (formData, history) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.put("/api/profile/education", formData, config);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert("EDUCATION ADDED", "success"));

      history.push("/dashboard");
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//delete experience
export const deleteExperience = id => {
  return async dispatch => {
    try {
      const res = await axios.delete("/api/profile/experience/" + id);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
      dispatch(setAlert("Experience deleted successfully", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//delete education
export const deleteEducation = id => {
  return async dispatch => {
    try {
      const res = await axios.delete("/api/profile/education/" + id);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
      dispatch(setAlert("Education deleted successfully", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
};

//delete account & profile

export const deleteAccount = () => {
  return async dispatch => {
    if (window.confirm("Are you sure? This cannot be undone")) {
      try {
        await axios.delete("/api/profile");
        dispatch({
          type: CLEAR_PROFILE
        });
        dispatch({
          type: ACCOUNT_DELETED
        });
        dispatch(setAlert("Your account has been successfully deleted"));
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  };
};
