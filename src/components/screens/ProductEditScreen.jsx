/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import {
  listProductDetails,
  updateProduct,
  resetUpdateProduct,
} from '../../actions/productActions';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';

const ProductEditScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [in_stock, setIn_stock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading: loadingProduct,
    error: errorProduct,
    product,
  } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch(resetUpdateProduct());
      history.push('/admin/productsList');
    } else {
      if (!product || product.product_id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setIn_stock(product.in_stock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await Axios.post(
        'http://localhost:5000/api/v1/uploads',
        formData,
        config
      );
      setImage(data.Location);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        name,
        image,
        brand,
        category,
        description,
        price,
        in_stock,
        product_id: productId,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productsList" className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        {loadingProduct && <Loader />}
        {loadingUpdate && <Loader />}
        {errorProduct && <Message variant="danger">{errorProduct}</Message>}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        <h1>Product Edit Screen</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="in_stock">
            <Form.Label>In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter In Stock"
              value={in_stock}
              onChange={(e) => setIn_stock(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image Path</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.File
              id="image-file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
            />
            {uploading && <Loader />}
          </Form.Group>

          <Button type="submit" variant="primary" className="btn btn-block">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};
export default ProductEditScreen;
