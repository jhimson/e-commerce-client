import { orderConstants } from '../constants/orderConstants';

const {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_FETCH_REQUEST,
  ORDER_FETCH_SUCCESS,
  ORDER_FETCH_FAIL,
  ORDER_DETAILS_FETCH_REQUEST,
  ORDER_DETAILS_FETCH_SUCCESS,
  ORDER_DETAILS_FETCH_FAIL,
  ORDER_ITEMS_FETCH_REQUEST,
  ORDER_ITEMS_FETCH_SUCCESS,
  ORDER_ITEMS_FETCH_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_FETCH_DISTINCT_REQUEST,
  ORDER_FETCH_DISTINCT_SUCCESS,
  ORDER_FETCH_DISTINCT_FAIL,
  ORDER_FETCH_ONE_REQUEST,
  ORDER_FETCH_ONE_SUCCESS,
  ORDER_FETCH_ONE_FAIL,
  ORDER_FETCH_ONE_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} = orderConstants;

export const orderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };

    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: payload };

    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export const orderFetchReducer = (
  state = { orderItems: [] },
  { type, payload }
) => {
  switch (type) {
    case ORDER_FETCH_REQUEST:
      return { ...state, loading: true };

    case ORDER_FETCH_SUCCESS:
      return { ...state, loading: false, success: true, orderItems: payload };

    case ORDER_FETCH_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export const orderDetailsFetchReducer = (
  state = { orderDetailsList: [] },
  { type, payload }
) => {
  switch (type) {
    case ORDER_DETAILS_FETCH_REQUEST:
      return { loading: true };

    case ORDER_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        orderDetailsList: payload,
      };

    case ORDER_DETAILS_FETCH_FAIL:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export const orderedItemsFetchReducer = (
  state = { orders: [], shippingDetails: {} },
  { type, payload }
) => {
  switch (type) {
    case ORDER_ITEMS_FETCH_REQUEST:
      return { ...state, loading: true };

    case ORDER_ITEMS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
        shippingDetails: {
          order_id: payload[0].order_id,
          name: payload[0].fullname,
          payment_email_address: payload[0].payment_email_address,
          payment_method: payload[0].payment_method,
          is_paid: payload[0].is_paid,
          is_delivered: payload[0].is_delivered,
          paid_at: payload[0].paid_at,
          address: payload[0].shipping_address,
          city: payload[0].shipping_city,
          postal_code: payload[0].shipping_postal_code,
          country: payload[0].shipping_country,
        },
      };

    case ORDER_ITEMS_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };

    case ORDER_PAY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const orderFetchDistinctReducer = (
  state = { distinctIds: [] },
  { type, payload }
) => {
  switch (type) {
    case ORDER_FETCH_DISTINCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_FETCH_DISTINCT_SUCCESS:
      return {
        ...state,
        loading: false,
        distinctIds: payload,
      };

    case ORDER_FETCH_DISTINCT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const orderFetchOneReducer = (
  state = { order: {} },
  { type, payload }
) => {
  switch (type) {
    case ORDER_FETCH_ONE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_FETCH_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        allOrderList: payload,
      };

    case ORDER_FETCH_ONE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case ORDER_FETCH_ONE_RESET:
      return {};

    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_DELIVER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DELIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };

    case ORDER_DELIVER_RESET:
      return {};

    default:
      return state;
  }
};
