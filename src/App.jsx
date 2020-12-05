import React from 'react';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './components/screens/HomeScreen';
import ProductScreen from './components/screens/ProductScreen';
import CartScreen from './components/screens/CartScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ShippingScreen from './components/screens/ShippingScreen';
import PaymentScreen from './components/screens/PaymentScreen';
import PlaceOrderScreen from './components/screens/PlaceOrderScreen';
import OrderScreen from './components/screens/OrderScreen';
import UserListScreen from './components/screens/UserListScreen';
import UserEditScreen from './components/screens/UserEditScreen';
import ProductListScreen from './components/screens/ProductListScreen';
import ProductEditScreen from './components/screens/ProductEditScreen';
import OrderListScreen from './components/screens/OrderListScreen';

const App = () => (
  <>
    <Header />
    <main className="py-3">
      <Container>
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/order/:id" component={OrderScreen} exact />
          <Route path="/shipping" component={ShippingScreen} exact />
          <Route path="/payment" component={PaymentScreen} exact />
          <Route path="/placeorder" component={PlaceOrderScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/admin/usersList" component={UserListScreen} exact />
          <Route path="/admin/ordersList" component={OrderListScreen} exact />
          <Route
            path="/admin/productsList"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/users/:id/edit"
            component={UserEditScreen}
            exact
          />
          <Route
            path="/admin/product/:id/edit"
            component={ProductEditScreen}
            exact
          />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
        </Switch>
      </Container>
    </main>
    <Footer />
  </>
);
export default App;
