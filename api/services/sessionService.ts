import Sequelize from 'sequelize';
import { User } from '../db/models/User';
import { Role } from '../db/models/Role';
import { _getByPk, _getOne } from '../repositories';

const Op = Sequelize.Op;

/**
 * Used to get user by PK
 * @param id 
 */
export const validUser = async (id: number) => await _getByPk(User, id);

/**
 * Used to authenticate user
 * @param userName 
 */
export const authenticate = async (userName: string) => {
    try {
        const queryString = {
            attributes: ['id', 'userName', 'password', 'salt', 'status'],
            where: { [Op.or]: { userName, email: userName } },
            include: [{
                attributes: ['name'],
                model: Role
              }],
        };
        return await _getOne(User, queryString);
    } catch (err) {
        return err;
    }
}

/**
 * Used to get user details by id
 * @param id 
 */
export const getUser = async (id: number) => {
    try {
        const queryString = {
            attributes: ['id', 'firstName', 'lastName', 'userName', 'phoneNumber', 'status'],
            where: { id }
        };
    return await _getOne(User, queryString);
    } catch (err) {
        return err;
    }
}