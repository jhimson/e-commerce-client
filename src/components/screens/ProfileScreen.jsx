import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FcCancel } from 'react-icons/fc';
import moment from 'moment';
import Message from '../Message';
import Loader from '../Loader';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import {
  getOrdersByUserId,
  getOrdersByOrderId,
  getAllOrderedItemsByOrderId,
} from '../../actions/orderActions';

const ProfileScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState('danger');

  const currentUser = useSelector((state) => state.userDetails);
  const { loading, error, user } = currentUser;
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const { orderItems } = useSelector((state) => state.orderFetch);

  const orderDetails = useSelector((state) => state.orderDetails);

  let uniqueOrderId = [];

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (user === null || JSON.stringify(user) === '{}') {
      dispatch(getUserDetails('profile'));
      dispatch(getOrdersByUserId(userInfo.user_id));
    } else {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      setUsername(user.username);
      dispatch(getOrdersByUserId(userInfo.user_id));
    }
    if (orderItems) {
      orderItems.forEach((order) => {
        if (!uniqueOrderId.includes(order.order_id)) {
          uniqueOrderId = [...uniqueOrderId, order.order_id];
        }
      });

      uniqueOrderId.forEach((id) => {
        dispatch(getOrdersByOrderId(id));
      });
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setVariant('danger');
      setMessage('Passwords do not match');
    } else {
      //* DISPATCH UPDATE PROFILE
      dispatch(
        updateUserProfile(email, firstname, lastname, username, password)
      );
      setVariant('success');
      setMessage('Profile Updated');
      setPassword('');
      setConfirmPassword('');
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant={variant}>{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="firstname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confimPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button className="btn-block" type="submit" variance="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ORDER CODE</th>
              <th>Date</th>
              <th>total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>information</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.loading && <Loader />}
            {orderDetails.orderDetailsList ? (
              orderDetails.orderDetailsList.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>
                    {moment(order.created_at).format('MMM Do YYYY, h:mm:ss A')}
                  </td>
                  <td>{Number(order.subtotal)}</td>
                  <td>
                    {order.paid_at === null ? (
                      <FcCancel size="2em" />
                    ) : (
                      moment(order.paid_at).format('MMM Do YYYY')
                    )}
                  </td>
                  <td>
                    {order.delivered_at === null ? (
                      <FcCancel size="2em" />
                    ) : (
                      moment(order.delivered_at).format(
                        'MMM Do YYYY, h:mm:ss A'
                      )
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order.order_id}`}>
                      <Button
                        className="btn-sm"
                        type="submit"
                        variant="dark"
                        onClick={() => {
                          dispatch(getAllOrderedItemsByOrderId(order.order_id));
                        }}
                      >
                        details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))
            ) : (
              <h2>No Orders found!</h2>
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
export default ProfileScreen;
