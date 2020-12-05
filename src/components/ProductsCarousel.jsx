import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

const ProductsCarousel = ({ products }) => {
  const history = useHistory();

  return (
    <>
      <Carousel>
        {products &&
          products.map((product) => (
            <Carousel.Item>
              <Link to={`/product/${product.product_id}`}>
                <img
                  className="d-block w-100"
                  src={product.image}
                  alt="First slide"
                />
              </Link>
              <Carousel.Caption>
                <h3>{`${product.name} ($${product.price})`}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};

export default ProductsCarousel;
