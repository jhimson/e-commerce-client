/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline, MdDeleteForever } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

import {
  deleteProduct,
  listProducts,
  createProduct,
  resetCreateProduct,
  resetProductDetails,
} from '../../actions/productActions';
import Loader from '../Loader';
import Message from '../Message';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { products } = useSelector((state) => state.productList);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = useSelector((state) => state.productDelete);
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);

  useEffect(() => {
    dispatch(resetCreateProduct());
    dispatch(resetProductDetails());
    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct.product_id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    successDelete,
    successCreate,
    userInfo,
    history,
    createdProduct,
  ]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="btn-sm"
            onClick={() => {
              dispatch(createProduct());
            }}
          >
            <MdAddCircleOutline size="3em" style={{ marginRight: '5px' }} />
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {loadingCreate && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      <Table bordered hover responsive className="mt-2 table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th colSpan="2" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((product) => (
              <tr>
                <td>{product.product_id}</td>
                <td>
                  <Link to={`/product/${product.product_id}`}>
                    {product.name}
                  </Link>
                </td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Button
                    variant="light"
                    className="btn-sm"
                    onClick={() => {
                      history.push(`/admin/product/${product.product_id}/edit`);
                    }}
                  >
                    <FaRegEdit size="2em" color="blue" />
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="light"
                    className="btn-sm"
                    onClick={() => {
                      dispatch(deleteProduct(product.product_id));
                    }}
                  >
                    <MdDeleteForever size="2em" color="red" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <h1>No Products found!</h1>
          )}
        </tbody>
      </Table>
    </>
  );
};
export default ProductListScreen;
