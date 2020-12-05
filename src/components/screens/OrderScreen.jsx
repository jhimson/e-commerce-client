/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Moment from 'moment';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaDollarSign } from 'react-icons/fa';
import Message from '../Message';
import Loader from '../Loader';
import {
  payOrder,
  getAllOrderedItemsByOrderId,
  deliverOrder,
  resetDeliverOrder,
} from '../../actions/orderActions';

import { resetProductDetails } from '../../actions/productActions';
import { orderConstants } from '../../constants/orderConstants';

const OrderScreen = () => {
  const { ORDER_PAY_RESET } = orderConstants;
  const [sdkReady, setSdkReady] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { user_id, email, isAdmin } = userInfo;

  const { orders, shippingDetails, loading, error } = useSelector(
    (state) => state.orderedItems
  );

  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );

  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = useSelector((state) => state.orderDeliver);

  // TODO - CALCULATIONS FOR PRICE
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  const subTotalPrice = addDecimals(
    orders.reduce(
      (accu, item) => accu + parseInt(item.price) * item.quantity,
      0
    )
  );
  const shippingPrice = addDecimals(subTotalPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number((0.15 * subTotalPrice).toFixed(2)));

  const totalPrice = (
    Number(subTotalPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (!email) {
      history.push('/login');
    }
    dispatch(resetProductDetails());
    const addPayPalScript = async () => {
      const { data: clientID } = await Axios.get(
        'http://localhost:5000/api/v1/config/paypal'
      );
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (orders.length === 0 || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(resetDeliverOrder());
      dispatch(getAllOrderedItemsByOrderId(id));
    } else if (!shippingDetails.is_paid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    id,
    orders,
    shippingDetails.is_paid,
    successPay,
    successDeliver,
    ORDER_PAY_RESET,
    email,
    history,
    user_id,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(shippingDetails.order_id, paymentResult));
    localStorage.removeItem('orderDetailsList');
  };

  return (
    <>
      {loadingDeliver && <Loader />}
      {errorDeliver && <Message variant="danger">{errorDeliver}</Message>}
      {error ? (
        <Message variant="danger">{`${error}`}</Message>
      ) : loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={8}>
            <Message variant="info">
              <h5>ORDER {id}</h5>
            </Message>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong>
                  {shippingDetails.name}
                </p>
                <p>
                  <strong>Email:</strong>
                  <a href={`mailto:${shippingDetails.payment_email_address}`}>
                    shippingDetails.payment_email_address
                  </a>
                </p>
                <p>
                  <strong>Address:</strong>
                  {shippingDetails.address},{shippingDetails.city}{' '}
                  {shippingDetails.postalCode} {shippingDetails.country}
                </p>
                {shippingDetails.is_delivered ? (
                  <Message variant="success">{`Delivered on ${Moment(
                    shippingDetails.delivered_at
                  ).format('MMMM Do YYYY, h:mm:ss A')} - (${Moment()
                    .startOf('hour')
                    .fromNow()})`}</Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Method:</strong>
                {shippingDetails.payment_method}
                {shippingDetails.is_paid ? (
                  <Message variant="success">
                    {`Paid on ${Moment(shippingDetails.paid_at).format(
                      'MMMM Do YYYY, h:mm:ss A'
                    )} - (${Moment().startOf('hour').fromNow()})`}
                  </Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order List</h2>

                {orders.length === 0 ? (
                  <Message>No items found!</Message>
                ) : (
                  <ListGroup variant="flush">
                    {orders.map((item) => (
                      <ListGroup.Item key={item.product}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product_id}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.quantity} x <FaDollarSign />
                            {item.price} = <FaDollarSign />
                            {item.quantity * item.price}
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
                    <Col>Subtotal</Col>
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
                {!shippingDetails.is_paid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
                {userInfo &&
                isAdmin &&
                shippingDetails.is_paid &&
                !shippingDetails.is_delivered ? (
                  <ListGroup.Item>
                    <Button
                      className="btn btn-block"
                      onClick={() => dispatch(deliverOrder(id))}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                ) : null}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
export default OrderScreen;
