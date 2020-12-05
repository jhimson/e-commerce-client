/* eslint-disable import/named */
import { cartConstants } from '../constants/cartConstants';

const {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET_ITEMS,
} = cartConstants;

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' },
  { type, payload }
) => {
  switch (type) {
    case CART_ADD_ITEM:
      // eslint-disable-next-line no-case-declarations
      const existItem = state.cartItems.find(
        (x) => x.product === payload.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? payload : x
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, payload],
      };

    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== payload),
      };
    }

    case CART_SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: payload,
      };
    }

    case CART_SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: payload,
      };
    }

    case CART_RESET_ITEMS: {
      return {
        ...state,
        cartItems: [],
      };
    }

    default:
      return state;
  }
};
