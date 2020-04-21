// @ts-ignore
import db from './db';
import { API_BASE_PATH, CONSTANTS } from '../constants';

export = {
  db: db.production,
  email: 'montykhanna007@hotmail.com',
  debugLog: 0,
  basePath: API_BASE_PATH,
  constants: CONSTANTS,
  sendEmail: 0,
};
