import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  LOGOUT,
  UPDATE_PROFILE,
  REMOVE_ACCOUNT,
  GET_PROFILES,
  GET_GITHUB_REPOS,
} from "./types.js";

//Reusable Code
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const handleErrors = (error, dispatch) => {
  const errors = error.response.data.errors;
  if (errors) {
    errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
  }
  dispatch({
    type: PROFILE_ERROR,
    payload: {
      msg: error.response.statusText,
      status: error.response.status,
    },
  });
};

//Gets current user's profile info
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      payload: res.data,
      type: GET_PROFILES,
    });
  } catch (error) {
    handleErrors(error, dispatch);
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      payload: res.data,
      type: GET_PROFILE,
    });
  } catch (error) {
    handleErrors(error, dispatch);
  }
};

export const getGitHubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      payload: res.data,
      type: GET_GITHUB_REPOS,
    });
  } catch (error) {
    handleErrors(error, dispatch);
  }
};
//logs out
export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};

//create or update profile
export const setProfileData = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await axios.post("/api/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Info updated." : "Profile created."), "success");

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    handleErrors(error, dispatch);
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    history.push("/dashboard");
    dispatch(setAlert("Experience added.", "success"));
  } catch (error) {
    handleErrors(error, dispatch);
  }
};

export const removeExperience = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert("Experience removed.", "success"));
    } catch (error) {
      handleErrors(error, dispatch);
    }
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    history.push("/dashboard");
    dispatch(setAlert("Education added."));
  } catch (error) {
    handleErrors(error, dispatch);
  }
};

export const removeEducation = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert("Education removed.", "success"));
    } catch (error) {
      handleErrors(error, dispatch);
    }
  }
};

//Delete account and profile

export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    try {
      const res = await axios.delete("/api/profile");

      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: REMOVE_ACCOUNT,
      });

      dispatch(setAlert("Your account has been deleted."));
    } catch (error) {
      handleErrors(error, dispatch);
    }
  }
};
