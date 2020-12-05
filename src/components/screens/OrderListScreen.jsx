/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FcCheckmark, FcHighPriority } from 'react-icons/fc';

import {
  fetchDistinctOrderId,
  fetchOneOrder,
  resetAllOrderList,
  getAllOrderedItemsByOrderId,
} from '../../actions/orderActions';

import { getUserDetails } from '../../actions/userActions';
import Message from '../Message';
import Loader from '../Loader';

const OrderListScreen = () => {
  const dispatch = useDispatch();

  // Global state
  const { distinctIds } = useSelector((state) => state.orderFetchDistinct);
  const { allOrderList, loading, error, success } = useSelector(
    (state) => state.orderFetchOne
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const { user_id } = userInfo;

  useEffect(() => {
    dispatch(fetchDistinctOrderId());
    dispatch(getUserDetails('profile'));
  }, [dispatch, user_id]);

  useEffect(() => {
    if (success) {
      dispatch(resetAllOrderList());
    }

    if (distinctIds.length !== 0) {
      distinctIds.forEach((idObj) => {
        dispatch(fetchOneOrder(idObj.order_id));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, distinctIds]);

  return (
    <div>
      <h1>Orders</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {allOrderList ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th colSpan="2" className="text-center">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {allOrderList.map((orderItem) => (
              <tr>
                <td>{orderItem.order_id}</td>
                <td>{orderItem.name}</td>
                <td>
                  {`${Moment(orderItem.created_at).format(
                    'MMMM Do YYYY, h:mm:ss A'
                  )} - (${Moment().startOf('hour').fromNow()})`}
                </td>
                <td>{orderItem.subtotal}</td>
                <td>
                  {orderItem.is_paid ? (
                    <FcCheckmark size="2em" />
                  ) : (
                    <FcHighPriority size="2em" />
                  )}
                </td>
                <td>
                  {orderItem.is_delivered ? (
                    <FcCheckmark size="2em" />
                  ) : (
                    <FcHighPriority size="2em" />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${orderItem.order_id}`}>
                    <Button
                      onClick={() => {
                        dispatch(
                          getAllOrderedItemsByOrderId(orderItem.order_id)
                        );
                      }}
                    >
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Message variant="danger">'No Orders Found!'</Message>
      )}
    </div>
  );
};
export default OrderListScreen;
