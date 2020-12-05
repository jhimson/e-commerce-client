import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import FormContainer from '../FormContainer';
import { register } from '../../actions/userActions';

const RegisterScreen = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const { loading, error } = useSelector((state) => state.userRegister);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      //* DISPATCH REGISTER
      dispatch(register(email, firstname, lastname, username, password));
      history.push('/login');
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="firstname">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="confimPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variance="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account ?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default RegisterScreen;
