/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../Message';
import Loader from '../Loader';
import FormContainer from '../FormContainer';
import {
  getUserToUpdate,
  updateUser,
  resetUserToUpdate,
} from '../../actions/userActions';

import { userConstants } from '../../constants/userConstants';

const { USER_UPDATE_RESET } = userConstants;

const UserEditScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    firstname: fn,
    lastname: ln,
    username: un,
    email: em,
    is_admin,
    loading,
  } = useSelector((state) => state.userUpdate.userToUpdate);

  const { success, loading: updateLoading } = useSelector(
    (state) => state.updatedUser
  );

  const { id: user_id } = useParams();
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (success) {
      history.push('/admin/usersList');
    }
    if (!fn) {
      dispatch(getUserToUpdate(user_id));
    } else {
      setFirstname(fn);
      setLastname(ln);
      setUsername(un);
      setEmail(em);
      setIsAdmin(is_admin);
    }
  }, [dispatch, user_id, fn, ln, un, em, is_admin, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        user_id,
        firstname,
        lastname,
        username,
        email,
        is_admin: isAdmin,
      })
    );
  };

  return (
    <>
      {success ? (
        <Message variant="success">Successfully Updated</Message>
      ) : null}
      <LinkContainer to="/admin/usersList">
        <Button
          className="btn-sm"
          onClick={() => {
            dispatch({ type: USER_UPDATE_RESET });
            dispatch(resetUserToUpdate());
          }}
        >
          Go Back
        </Button>
      </LinkContainer>
      {updateLoading ? <Loader /> : null}
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          <h1>Update User Account</h1>
          <Form>
            <Form.Group controlId="userId">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" value={user_id} disabled />
            </Form.Group>
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
            <Form.Group controlId="username">
              <Form.Check
                type="checkbox"
                id="customControlAutosizing"
                label="is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                custom
              />
            </Form.Group>
            <Button
              type="submit"
              variance="primary"
              onClick={(e) => submitHandler(e)}
            >
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};
export default UserEditScreen;
