/**
 * @author: Monty Khanna
 */
import config from 'config';
import roleList from './roleList';

const prefix = config.get('basePath');

export = [
  {
    path: `${prefix}/role`,
    method: 'GET',
    config: roleList,
  },
];
