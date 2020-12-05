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

export const fetchReviewsReducer = (
  state = { reviews: [] },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: payload,
      };

    case PRODUCT_FETCH_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case PRODUCT_FETCH_REVIEWS_RESET:
      return {
        reviews: [],
      };
    default:
      return state;
  }
};

export const createReviewReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_CREATE_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case PRODUCT_CREATE_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case PRODUCT_CREATE_REVIEWS_RESET:
      return {};
    default:
      return state;
  }
};
