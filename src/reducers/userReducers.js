import { userConstants } from '../constants/userConstants';

const {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REMOVE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
  USER_GET_RESET,
} = userConstants;

export const userLoginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };

    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, userInfo: payload };

    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: payload };

    case USER_LOGOUT:
      return { ...state, userInfo: null };

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };

    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: payload };

    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: payload };

    case USER_REGISTER_RESET:
      return { ...state, loading: false, userInfo: {} };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, { type, payload }) => {
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: payload };

    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };

    case USER_DETAILS_REMOVE:
      return { ...state, loading: false, user: {} };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state = { user: {} },
  { type, payload }
) => {
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, success: true, user: payload };

    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, loading: false, error: payload };

    case USER_UPDATE_PROFILE_RESET:
      return { ...state, loading: false, user: {} };

    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, { type, payload }) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      };

    case USER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const deletedUserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case USER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const updatedUserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };

    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userGetReducer = (
  state = { userToUpdate: {} },
  { type, payload }
) => {
  switch (type) {
    case USER_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        userToUpdate: payload,
      };

    case USER_GET_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case USER_GET_RESET:
      return {
        userToUpdate: {},
      };

    default:
      return state;
  }
};
