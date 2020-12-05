import Axios from 'axios';
import { cartConstants } from '../constants/cartConstants';

const {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET_ITEMS,
} = cartConstants;

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(
      `http://localhost:5000/api/v1/products/${id}`
    );

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data.product_id,
        image: data.image,
        name: data.name,
        price: data.price,
        in_stock: data.in_stock,
        qty,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  console.log(id);
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

export const resetCartItems = () => async (dispatch) => {
  dispatch({
    type: CART_RESET_ITEMS,
    payload: {},
  });

  localStorage.removeItem('cartItems');
};
