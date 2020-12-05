import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  fetchTopProductReducer,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import {
  fetchReviewsReducer,
  createReviewReducer,
} from './reducers/reviewReducers';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  deletedUserReducer,
  updatedUserReducer,
  userGetReducer,
} from './reducers/userReducers';

import {
  orderCreateReducer,
  orderFetchReducer,
  orderDetailsFetchReducer,
  orderedItemsFetchReducer,
  orderPayReducer,
  orderFetchDistinctReducer,
  orderFetchOneReducer,
  orderDeliverReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  topProductFetch: fetchTopProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  usersList: userListReducer,
  userDelete: deletedUserReducer,
  userUpdate: userGetReducer,
  updatedUser: updatedUserReducer,
  orderFetchDistinct: orderFetchDistinctReducer,
  orderFetchOne: orderFetchOneReducer,
  orderCreate: orderCreateReducer,
  orderFetch: orderFetchReducer,
  orderDetails: orderDetailsFetchReducer,
  orderedItems: orderedItemsFetchReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  reviewsFetch: fetchReviewsReducer,
  reviewsCreate: createReviewReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const paymentAddressFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : 'PayPal';

const orderDetailsFromStorage = localStorage.getItem('orderDetailsList')
  ? JSON.parse(localStorage.getItem('orderDetailsList'))
  : [];

const userDetailsFromStorage = localStorage.getItem('userDetails')
  ? JSON.parse(localStorage.getItem('userDetails'))
  : null;

const usersListFromStorage = localStorage.getItem('usersList')
  ? JSON.parse(localStorage.getItem('usersList'))
  : null;

const productListFromStorage = localStorage.getItem('productList')
  ? JSON.parse(localStorage.getItem('productList'))
  : [];

const allOrderListFromStorage = localStorage.getItem('allOrderList')
  ? JSON.parse(localStorage.getItem('allOrderList'))
  : [];

const initialState = {
  productList: { products: productListFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  orderDetails: { orderDetailsList: orderDetailsFromStorage },
  orderFetchOne: { allOrderList: allOrderListFromStorage },
  userDetails: { user: userDetailsFromStorage },
  usersList: { users: usersListFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
