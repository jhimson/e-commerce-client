/* eslint-disable camelcase */
import Axios from 'axios';
import { reviewConstants } from '../constants/reviewConstants';

const {
  PRODUCT_FETCH_REVIEWS_REQUEST,
  PRODUCT_FETCH_REVIEWS_SUCCESS,
  PRODUCT_FETCH_REVIEWS_FAIL,
  PRODUCT_FETCH_REVIEWS_RESET,
  PRODUCT_CREATE_REVIEWS_REQUEST,
  PRODUCT_CREATE_REVIEWS_SUCCESS,
  PRODUCT_CREATE_REVIEWS_FAIL,
  PRODUCT_CREATE_REVIEWS_RESET,
} = reviewConstants;

export const fetchReviews = (product_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_FETCH_REVIEWS_REQUEST });

    const { data } = await Axios.get(
      `https://raboy-eshop.herokuapp.com/api/v1/reviews/${product_id}`
    );
    dispatch({ type: PRODUCT_FETCH_REVIEWS_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({
      type: PRODUCT_FETCH_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const resetReviews = () => async (dispatch) => {
  dispatch({ type: PRODUCT_FETCH_REVIEWS_RESET });
};

export const createReview = (ratingObj) => async (dispatch, getState) => {
  const { product_id, rating, comment } = ratingObj;
  const { token } = getState().userLogin.userInfo;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: PRODUCT_CREATE_REVIEWS_REQUEST });

    await Axios.post(
      `https://raboy-eshop.herokuapp.com/api/v1/reviews/${product_id}`,
      {
        product_id,
        rating,
        comment,
      },
      config
    );
    dispatch({ type: PRODUCT_CREATE_REVIEWS_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const resetCreateReview = () => async (dispatch) => {
  dispatch({ type: PRODUCT_CREATE_REVIEWS_RESET });
};
