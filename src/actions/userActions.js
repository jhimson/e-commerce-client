/* eslint-disable camelcase */
import Axios from 'axios';

import { userConstants } from '../constants/userConstants';

const { uuid } = require('uuidv4');

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
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
  USER_GET_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} = userConstants;

export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await Axios.post(
      'http://localhost:5000/api/v1/users/login',
      { username, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('orderDetailsList');
  localStorage.removeItem('paymentMethod');
  localStorage.removeItem('shippingAddress');
  localStorage.removeItem('userDetails');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_REMOVE });
  dispatch({ type: USER_REGISTER_RESET });
};

export const register = (
  email,
  firstname,
  lastname,
  username,
  password
) => async (dispatch) => {
  const user_id = uuid();
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await Axios.post(
      'http://localhost:5000/api/v1/users',
      { user_id, email, firstname, lastname, username, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const getUserDetails = (user_id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await Axios.get(
      `http://localhost:5000/api/v1/users/${user_id}`,
      config
    );
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    localStorage.setItem('userDetails', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const updateUserProfile = (
  email,
  firstname,
  lastname,
  username,
  password
) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await Axios.put(
      `http://localhost:5000/api/v1/users/profile`,
      { email, firstname, lastname, username, password },
      config
    );
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { data } = await Axios.get(
      `http://localhost:5000/api/v1/users`,
      config
    );

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
    localStorage.setItem('usersList', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const deleteUser = (user_id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: USER_DELETE_REQUEST });

    await Axios.delete(`http://localhost:5000/api/v1/users/${user_id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const { data } = await Axios.put(
      `http://localhost:5000/api/v1/users/${user.user_id}`,
      user,
      config
    );
    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const getUserToUpdate = (user_id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;
  console.log('USER ID TO UPDATE', user_id);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: USER_GET_REQUEST });

    const { data } = await Axios.get(
      `http://localhost:5000/api/v1/users/${user_id}`,
      config
    );
    console.log(data);
    dispatch({ type: USER_GET_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_GET_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const resetUserToUpdate = () => async (dispatch) => {
  dispatch({ type: USER_GET_RESET });
};

export const resetUpdatedUser = () => async (dispatch) => {
  dispatch({ type: USER_UPDATE_RESET });
};
