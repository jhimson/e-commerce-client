/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUserCircle, FaUserFriends } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const CustomNavbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { user } = useSelector((state) => state.userDetails);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {}, [user]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  // Get total items in the cart
  const cartCount = cartItems.reduce(
    (accu, curr) => Number(curr.qty) + accu,
    0
  );
  return (
    <Navbar bg="dark" variant="dark" expand="lg" colapseOnSelect>
      <Container>
        <Link to="/">
          <Navbar.Brand>Raboy's E-Shop</Navbar.Brand>
        </Link>
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox />
          <Nav className="ml-auto">
            <Nav.Link onClick={() => history.push('/cart')}>
              Cart <FaShoppingCart size="2em" />
              {cartItems.length !== 0 && (
                <Badge variant="danger" style={{ fontSize: '12px' }}>
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="email">
                <>
                  <LinkContainer to="/admin/usersList">
                    <NavDropdown.Item>View Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/ordersList">
                    <NavDropdown.Item>View Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productsList">
                    <NavDropdown.Item>View Products</NavDropdown.Item>
                  </LinkContainer>
                </>
              </NavDropdown>
            )}

            {userInfo ? (
              <NavDropdown title={userInfo.email} id="email">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link onClick={() => history.push('/login')}>
                <FaUserCircle size="2em" /> Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
