/* eslint-disable no-unreachable */
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

export const productListReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [] };

    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: payload };

    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {} },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: payload };

    case PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: payload };

    case PRODUCT_DETAILS_RESET:
      return { product: {} };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case PRODUCT_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: payload,
      };

    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: payload,
      };

    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case PRODUCT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const fetchTopProductReducer = (
  state = { products: [] },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_LIST_TOP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_LIST_TOP_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
      };

    case PRODUCT_LIST_TOP_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
