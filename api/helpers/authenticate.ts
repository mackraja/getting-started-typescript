/**
 * @author: Monty Khanna
 */
import db from '../db'; // eslint-disable-line

export const checkDbConnection = () => db.authenticate();
