/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Product from '../Product';
import {
  listProducts,
  resetProductDetails,
  fetchTopProducts,
} from '../../actions/productActions';
import Loader from '../Loader';
import Message from '../Message';
import { getOrdersByUserId } from '../../actions/orderActions';
import { resetReviews, resetCreateReview } from '../../actions/reviewActions';
import Paginator from '../Paginator';
import ProductsCarousel from '../ProductsCarousel';
import Meta from '../Meta';

const HomeScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const topProducts = useSelector((state) => state.topProductFetch);
  const { products: topThreeProducts } = topProducts;

  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().indexOf(keyword) !== -1
  );

  useEffect(() => {
    dispatch(fetchTopProducts());
    dispatch(resetCreateReview());
    dispatch(resetReviews());
    dispatch(resetProductDetails());
    dispatch(listProducts());
    if (userInfo) {
      dispatch(getOrdersByUserId(userInfo.user_id));
    }
  }, [dispatch, userInfo, keyword]);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const numberOfPages = Math.ceil(products.length / productsPerPage);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Meta />
      {topThreeProducts && !keyword ? (
        <ProductsCarousel products={topThreeProducts} />
      ) : (
        <Link to="/" className="btn btn-dark">
          Go Back
        </Link>
      )}
      {!keyword && <h1>Featured Products</h1>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products.length === 0 ? (
        <Message>No Products found!</Message>
      ) : (
        <>
          <Row>
            {filteredProducts.length !== 0
              ? filteredProducts.map((product) => (
                  <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))
              : currentProducts.map((product) => (
                  <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
          </Row>
          <Row>
            {numberOfPages > 1 ? (
              <Container>
                <Paginator
                  productsPerPage={productsPerPage}
                  totalProducts={products.length}
                  paginate={paginate}
                />
              </Container>
            ) : null}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
