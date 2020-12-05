/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  const { product_id, image, name, rating, num_reviews, price } = product;
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`product/${product_id}`}>
        <Card.Img src={image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product_id}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating value={rating} text={`${num_reviews} reviews`} />
          </div>
        </Card.Text>

        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
