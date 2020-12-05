/* eslint-disable camelcase */
import Axios from 'axios';
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

export const createOrder = (order) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await Axios.post(
      `https://raboy-eshop.herokuapp.com/api/v1/orders`,
      order,
      config
    );
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const getOrdersByUserId = (user_id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;
  try {
    dispatch({ type: ORDER_FETCH_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await Axios.get(
      `https://raboy-eshop.herokuapp.com/api/v1/orders`,
      config
    );
    dispatch({ type: ORDER_FETCH_SUCCESS, payload: data.rows });
  } catch (error) {
    dispatch({
      type: ORDER_FETCH_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const getOrdersByOrderId = (order_id) => async (dispatch, getState) => {
  const { token, user_id } = getState().userLogin.userInfo;
  try {
    dispatch({ type: ORDER_DETAILS_FETCH_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await Axios.post(
      `https://raboy-eshop.herokuapp.com/api/v1/orders/orderDetails`,
      { user_id, order_id },
      config
    );

    let orders = localStorage.getItem('orderDetailsList')
      ? JSON.parse(localStorage.getItem('orderDetailsList'))
      : [];
    if (orders.length === 0) {
      orders = [...orders, data.rows];
    } else {
      let isExist = false;
      orders.forEach((order) => {
        if (order.order_id === data.rows.order_id) {
          console.log(order.order_id, data.rows.order_id);
          isExist = true;
        }
      });

      if (!isExist) {
        orders = [...orders, data.rows];
      }
    }
    console.log('ORDERS ARRAY', orders);
    dispatch({ type: ORDER_DETAILS_FETCH_SUCCESS, payload: orders });
    localStorage.setItem('orderDetailsList', JSON.stringify(orders));
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FETCH_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const payOrder = (order_id, paymentResult) => async (
  dispatch,
  getState
) => {
  const { token } = getState().userLogin.userInfo;
  console.log(token);
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await Axios.put(
      `https://raboy-eshop.herokuapp.com/api/v1/orders/${order_id}/pay`,
      paymentResult,
      config
    );

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const fetchDistinctOrderId = () => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: ORDER_FETCH_DISTINCT_REQUEST });

    const { data } = await Axios.get(
      `https://raboy-eshop.herokuapp.com/api/v1/orders/distinct`,
      config
    );
    dispatch({ type: ORDER_FETCH_DISTINCT_SUCCESS, payload: data.rows });
  } catch (error) {
    dispatch({
      type: ORDER_FETCH_DISTINCT_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const fetchOneOrder = (order_id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: ORDER_FETCH_ONE_REQUEST });

    const { data } = await Axios.get(
      `https://raboy-eshop.herokuapp.com/api/v1/orders/${order_id}/orderDetails`,
      config
    );
    let allOrderList = localStorage.getItem('allOrderList')
      ? JSON.parse(localStorage.getItem('allOrderList'))
      : [];

    if (allOrderList.length === 0) {
      allOrderList = [...allOrderList, data.order];
    } else {
      let isExist = false;
      allOrderList.forEach((order) => {
        if (order.order_id === data.order.order_id) {
          console.log(order.order_id, data.order.order_id);
          isExist = true;
        }
      });

      if (!isExist) {
        allOrderList = [...allOrderList, data.order];
      }
    }
    dispatch({ type: ORDER_FETCH_ONE_SUCCESS, payload: allOrderList });
    localStorage.setItem('allOrderList', JSON.stringify(allOrderList));
  } catch (error) {
    dispatch({
      type: ORDER_FETCH_ONE_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const resetAllOrderList = () => async (dispatch) => {
  localStorage.removeItem('allOrderList');
  dispatch({ type: ORDER_FETCH_ONE_RESET });
};

export const getAllOrderedItemsByOrderId = (order_id) => async (
  dispatch,
  getState
) => {
  const { token } = getState().userLogin.userInfo;
  try {
    dispatch({ type: ORDER_ITEMS_FETCH_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await Axios.get(
      `https://raboy-eshop.herokuapp.com/api/v1/orders/${order_id}/all`,
      config
    );
    dispatch({ type: ORDER_ITEMS_FETCH_SUCCESS, payload: data.orders });
    localStorage.setItem('orderedItems', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ORDER_ITEMS_FETCH_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const deliverOrder = (order_id) => async (dispatch, getState) => {
  const { token } = getState().userLogin.userInfo;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    await Axios.put(
      `https://raboy-eshop.herokuapp.com/api/v1/orders/${order_id}/deliver`,
      {},
      config
    );

    dispatch({ type: ORDER_DELIVER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const resetDeliverOrder = () => async (dispatch) => {
  dispatch({ type: ORDER_DELIVER_RESET });
};
