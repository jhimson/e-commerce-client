/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const Rating = ({ value, text, color, forReviews }) => {
  const stars = [
    { full: 1, half: 0.5 },
    { full: 2, half: 1.5 },
    { full: 3, half: 2.5 },
    { full: 4, half: 3.5 },
    { full: 5, half: 4.5 },
  ];
  return (
    <div className="rating">
      {stars.map(({ full, half }) => (
        <span style={{ color }}>
          {value >= full ? (
            <BsStarFill />
          ) : value >= half ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
      ))}
      {!forReviews && <span>{` ${text && text}`}</span>}
    </div>
  );
};

Rating.defaultProps = {
  color: '#D4AF37',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
