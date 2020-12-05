/* eslint-disable camelcase */
import Axios from 'axios';
import { productConstants } from '../constants/productConstants';

const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_LIST_TOP_REQUEST,
  PRODUCT_LIST_TOP_SUCCESS,
  PRODUCT_LIST_TOP_FAIL,
} = productConstants;

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await Axios.get(
      'https://raboy-eshop.herokuapp.com/api/v1/products'
    );

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    localStorage.setItem('productList', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const listProductDetails = (product_id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const response = await Axios.get(
      `https://raboy-eshop.herokuapp.com/api/v1/products/${product_id}`
    );

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const deleteProduct = (product_id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    await Axios.delete(
      `https://raboy-eshop.herokuapp.com/api/v1/products/${product_id}`,
      config
    );

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
    dispatch({ type: PRODUCT_DELETE_RESET });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;
  console.log('TOKIN', token);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const { data } = await Axios.post(
      `https://raboy-eshop.herokuapp.com/api/v1/products`,
      {},
      config
    );

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.rows[0] });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const { data } = await Axios.put(
      `https://raboy-eshop.herokuapp.com/api/v1/products/${product.product_id}`,
      product,
      config
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data.rows[0] });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const fetchTopProducts = () => async (dispatch, getState) => {
  // const { token } = getState().userLogin.userInfo;
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  try {
    dispatch({ type: PRODUCT_LIST_TOP_REQUEST });

    const { data } = await Axios.get(
      'https://raboy-eshop.herokuapp.com/api/v1/products/top'
    );

    dispatch({ type: PRODUCT_LIST_TOP_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_TOP_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const resetUpdateProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT_UPDATE_RESET });
};

export const resetProductDetails = () => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_RESET });
};

export const resetCreateProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT_CREATE_RESET });
};

export const filterProducts = (updatedProductList) => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_SUCCESS, payload: updatedProductList });
};
