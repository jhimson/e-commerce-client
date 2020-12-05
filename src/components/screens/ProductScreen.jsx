/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Button, Row, Col, Image, ListGroup, Form } from 'react-bootstrap';
import Rating from '../Rating';
import { listProductDetails } from '../../actions/productActions';
import {
  fetchReviews,
  createReview,
  resetCreateReview,
} from '../../actions/reviewActions';
import Loader from '../Loader';
import Message from '../Message';
import Meta from '../Meta';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const user = useSelector((state) => state.userLogin.userInfo);

  const productReviews = useSelector((state) => state.reviewsFetch);
  const {
    error: errorReviewsFetch,
    loading: loadingReviewsFetch,
  } = productReviews;

  const {
    reviews,
    error: errorReviews,
    loading: loadingReviews,
  } = productReviews;

  const createdReview = useSelector((state) => state.reviewsCreate);
  const {
    success: createReviewSuccess,
    error: createReviewError,
    loading: createReviewLoading,
  } = createdReview;

  useEffect(() => {
    dispatch(fetchReviews(id));
    if (Object.keys(product).length === 0) {
      dispatch(listProductDetails(id));
    }
  }, [dispatch, id, product, createReviewSuccess]);

  const addToCarThandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
    setTimeout(() => {
      history.push('/');
    }, 1000);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview({ product_id: id, rating, comment }));
    setRating('');
    setComment('');
    dispatch(resetCreateReview());
  };

  return (
    <>
      <Link>
        <Button onClick={() => history.goBack()}>Go Back</Button>{' '}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" msg={error} />
      ) : (
        <>
          <Meta title={product.name} />
          <Row className="mt-5">
            <Col md={6}>
              <Image src={product.image} alt={product.name} thumbnail />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.num_reviews} Reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>
                    Price:
                    {product.price}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.in_stock > 0 ? `In Stock` : `Out of Stock`}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.in_stock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.in_stock).keys()].map((index) => (
                            <option key={index + 1}>{index + 1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    disabled={product.in_stock === 0}
                    onClick={() => addToCarThandler(id, qty)}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              {createReviewLoading && <Loader />}
              <ListGroup variant="flush">
                {reviews.map((review) => (
                  <ListGroup.Item>
                    <pre>{review.username}</pre>{' '}
                    <Rating value={review.rating} forReviews />
                    <p>{`${Moment(review.created_at).format(
                      'MMMM Do YYYY, h:mm:ss a'
                    )}`}</p>
                    <pre>{review.comment}</pre>
                  </ListGroup.Item>
                ))}
                {reviews.length === 0 && (
                  <Message>
                    <h5>{errorReviews}</h5>
                  </Message>
                )}
                <h2>WRITE A CUSTOMER REVIEW</h2>
                {user !== null ? (
                  <ListGroup.Item>
                    {createReviewError && (
                      <Message variant="danger">{createReviewError}</Message>
                    )}
                    {createReviewSuccess && (
                      <Message variant="success">
                        Successfully Added Review
                      </Message>
                    )}

                    <Form.Group>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                      >
                        <option value={1}>1 - Poor</option>
                        <option value={2}>2 - Fair</option>
                        <option value={3}>3 - Good</option>
                        <option value={4}>4 - Very Good</option>
                        <option value={5}>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required="required"
                      />
                    </Form.Group>
                    <Button onClick={reviewSubmitHandler}>Submit</Button>
                  </ListGroup.Item>
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review
                  </Message>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default ProductScreen;
