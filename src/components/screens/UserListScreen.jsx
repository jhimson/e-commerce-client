/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import Message from '../Message';
import Loader from '../Loader';
import {
  listUsers,
  deleteUser,
  getUserToUpdate,
  resetUpdatedUser,
} from '../../actions/userActions';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { users, loading, error } = useSelector((state) => state.usersList);

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: deleteUserLoading,
    error: deleteUserError,
    success,
  } = useSelector((state) => state.userDelete);

  useEffect(() => {
    dispatch(resetUpdatedUser());
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, success]);

  const deleteHandler = (user_id) => {
    dispatch(deleteUser(user_id));
  };

  return (
    <div>
      <h1>Users</h1>
      {deleteUserError ? (
        <Message variant="danger">{deleteUserError}</Message>
      ) : null}
      {success && (
        <Message variant="success">Successfully deleted user</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>USER ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Active</th>
              <th>Admin</th>
              <th colSpan="2" className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users !== null &&
              users.length !== 0 &&
              users.map((user) => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.is_active ? (
                      <FcCheckmark size="2em" />
                    ) : (
                      <FcCancel size="2em" />
                    )}
                  </td>
                  <td>
                    {user.is_admin ? (
                      <FcCheckmark size="2em" />
                    ) : (
                      <FcCancel size="2em" />
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/users/${user.user_id}/edit`}>
                      <Button
                        variant="light"
                        className="btn-sm"
                        onClick={() => dispatch(getUserToUpdate(user.user_id))}
                      >
                        <FaRegEdit size="3em" color="blue" />
                        Edit
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={() => deleteHandler(user.user_id)}
                    >
                      <MdDeleteForever size="3em" color="red" />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserListScreen;
