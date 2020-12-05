/* eslint-disable camelcase */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaDollarSign } from 'react-icons/fa';
import { uuid } from 'uuidv4';
import Message from '../Message';
import CheckoutSteps from '../CheckoutSteps';
import { createOrder } from '../../actions/orderActions';
import { resetCartItems } from '../../actions/cartActions';

const PlaceOrderScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );

  const {
    userInfo: { user_id, email },
  } = useSelector((state) => state.userLogin);

  // TODO - CALCULATIONS FOR PRICE
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  const subTotalPrice = addDecimals(
    cartItems.reduce((accu, item) => accu + parseInt(item.price) * item.qty, 0)
  );
  const shippingPrice = addDecimals(subTotalPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number((0.15 * subTotalPrice).toFixed(2)));

  const totalPrice = (
    Number(subTotalPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    const order_id = uuid();

    const orderItems = cartItems.map((item) => ({
      order_id,
      product_id: item.product,
      user_id,
      quantity: item.qty,
      payment_method: paymentMethod,
      payment_email_address: email,
    }));
    orderItems.forEach((item) => {
      dispatch(
        createOrder({
          order_id: item.order_id,
          product_id: item.product_id,
          user_id: item.user_id,
          quantity: item.quantity,
          payment_method: item.payment_method,
          payment_email_address: item.payment_email_address,
          shipping_address: shippingAddress.address,
          shipping_city: shippingAddress.city,
          shipping_postal_code: shippingAddress.postalCode,
          shipping_country: shippingAddress.country,
        })
      );
    });

    dispatch(resetCartItems());
    history.push('/');
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address},{shippingAddress.city}{' '}
                {shippingAddress.postalCode} {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order List</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to="/product/<FaDollarSign />{item.product}">
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x <FaDollarSign />
                          {item.price} = <FaDollarSign />
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    <FaDollarSign />
                    {subTotalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    <FaDollarSign />
                    {shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>
                    <FaDollarSign />
                    {taxPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    <FaDollarSign />
                    {totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.lenght === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default PlaceOrderScreen;
