import db from "../db";
import config from "config";
import { listFilter } from '../interface/common'; // eslint-disable-line
import { _add, _delete, _update, _getByPk, _getOne, _getList } from '../repositories';
import { getSalt, hashPassword } from "./cryptoService";

const { User, Role } = db.models;

/**
 * listUser: List of users with roles
 * @param query
 */
export const listUser = async (query: listFilter) => {
  try {
    const { limit, sortBy, order } = query;
    const queryString = {
        include: [{
          attributes: ['name', 'status', 'createdAt'],
          model: Role
        }],
        attributes: ['firstName', 'lastName', 'userName', 'email', 'phoneNumber', 'status', 'createdAt'],
        where: { status: true, isDeleted: false },
        limit,
        order: [[sortBy, order]],
      };
    return await _getList(User, queryString);
  } catch (err) {
    return err;
  }
};

/**
 * addUser: Used to add new record in user table
 * @param payload
 */
export const addUser = (payload: any) => {
  try {
    return db.transaction(async (transaction: any) => {
      payload.email = payload.email.toLowerCase();
      const queryString = { where: { email: payload.email }, transaction }
      const foundUser = await _getOne(User, queryString);
      if (foundUser) {
        let data: any = {};
        data.isEmailExist = true;
        return data;
      }
      payload.salt = getSalt();
      payload.password = await hashPassword(payload.password, payload.salt);
      await _add(User, payload, { transaction });
      if (config.get('sendEmail')) {
        // TODO: Send email code
      }
      return true;
    });
  } catch (err) {
    return err;
  }
};

/**
 * updateUser: Used to update record in user table
 * @param params
 * @param payload
 */
export const updateUser = async (params: { id: number }, payload: any) => {
  try {
    return db.transaction(async (transaction: any) => {
      payload.email = payload.email.toLowerCase();
      const { id } = params;
      const findQueryString = { where: { email: payload.email }, transaction }
      const foundUser = await _getOne(User, findQueryString);
      if (foundUser) {
        let data: any = {};
        data.isEmailExist = true;
        return data;
      }
      const updateQueryString = { where: { id }, transaction };
      await _update(User, payload, updateQueryString);
      if (config.get('sendEmail')) {
        // TODO: Verify email code
      }
      return true;
    });
  } catch (err) {
    return err;
  }
};

/**
 * deleteUser: Used to delete record in user table
 * @param params
 */
export const deleteUser = async (params: { id: number }) => {
  try {
    const { id } = params;
    const isUserExist = await _getByPk(User, id);
    if (!isUserExist) {
      let data: any = {};
      data.notExist = true;
      return data;
    }
    const queryString = { where: { id } };
    await _delete(User, queryString);
    return true;
  } catch (err) {
    return err;
  }
};
