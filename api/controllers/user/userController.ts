/**
 * @author: Monty Khanna
 */
import config from 'config';
import userList from './userList';
import userCreate from './userCreate';
import userEdit from './userEdit';
import userDelete from './userDelete';

const prefix = config.get('basePath');

export = [
  {
    path: `${prefix}/user`,
    method: 'GET',
    config: userList,
  },
  {
    path: `${prefix}/user`,
    method: 'POST',
    config: userCreate,
  },
  {
    path: `${prefix}/user/{id}`,
    method: 'PUT',
    config: userEdit,
  },
  {
    path: `${prefix}/user/{id}`,
    method: 'DELETE',
    config: userDelete,
  },
];
