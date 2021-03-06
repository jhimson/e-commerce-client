import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keyword" content={keywords} />
  </Helmet>
);

Meta.defaultProps = {
  title: `Welcome to Raboy's E-Shop`,
  description: `We sell the products for cheap`,
  keywords: `electronics, buy electronics, cheap electronics`,
};

export default Meta;
