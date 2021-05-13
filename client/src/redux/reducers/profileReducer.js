import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  LOGOUT,
  UPDATE_PROFILE,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_FAIL,
  REMOVE_ACCOUNT,
  GET_PROFILES,
  GET_GITHUB_REPOS,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_GITHUB_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REMOVE_ACCOUNT:
    case LOGOUT:
      return {
        ...state,
        profile: null,
        profiles: [],
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
