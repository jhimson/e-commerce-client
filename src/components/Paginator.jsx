/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

const Paginator = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];
  const [activeItem, setActiveItem] = useState(1);

  for (
    let number = 1;
    number <= Math.ceil(totalProducts / productsPerPage);
    number++
  ) {
    pageNumbers.push(
      <Pagination.Item
        key={number}
        active={number === activeItem}
        onClick={() => {
          setActiveItem(number);
          paginate(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <div>
        <Pagination size="lg">{pageNumbers}</Pagination>
        <br />
      </div>
    </div>
  );
};
export default Paginator;
