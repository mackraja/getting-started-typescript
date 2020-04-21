/**
 * @author: Monty Khanna
 */
import config from 'config';
import sessionGet from './sessionGet'; // eslint-disable-line
import sessionCreate from './sessionCreate'; // eslint-disable-line
import sessionDestroy from './sessionDestroy'; // eslint-disable-line

const prefix = config.get('basePath');

export = [
  {
    path: `${prefix}/session`,
    method: 'GET',
    config: sessionGet,
  },
  {
    path: `${prefix}/session`,
    method: 'POST',
    config: sessionCreate,
  },
  {
    path: `${prefix}/session`,
    method: 'DELETE',
    config: sessionDestroy,
  },
];
