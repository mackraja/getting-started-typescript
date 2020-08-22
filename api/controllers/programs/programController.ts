/**
 * @author: Monty Khanna
 */
import config from 'config';
import fizzbuzz from './fizzbuzz';

const prefix = config.get('basePath');

export = [
  {
    path: `${prefix}/fizzbuzz/{count}`,
    method: 'GET',
    config: fizzbuzz,
  },
];
