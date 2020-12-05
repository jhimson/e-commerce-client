import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProductsCarousel = ({ products }) => {
  const history = useHistory();
  return (
    <>
      <Carousel pause="hover" className="bg-dark">
        {products &&
          products.map((product) => (
            <Carousel.Item key={product.product_id}>
              <Link to={`/product/${product.product_id}`}>
                <img
                  className="d-block w-100"
                  src={product.image}
                  alt={product.name}
                />
                <Carousel.Caption>
                  <h2>{`${product.name} ($${product.price})`}</h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};

export default ProductsCarousel;
