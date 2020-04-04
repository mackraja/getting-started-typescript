/**
 * @author: Monty Khanna
 */
import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import db from '../../db';
import { _add } from '../../db/repositories'; // eslint-disable-line
import {
  _nameSchema,
  _surnameSchema,
  _integerSchema,
  _stringSchema,
  _emailSchema,
} from '../../db/schema';
import { i18n } from '../../helpers';
import {IRequest, IResponse} from "../../interface/request"; // eslint-disable-line

const { User } = db.models;

const userCreate = {
  auth: false,

  tags: ['api', 'User'],

  description: 'Create User',

  notes: 'Create new user',

  validate: {
    query: joi.object({
      roleId: _integerSchema.required().description(i18n.__('controllers.user.query.roleId')),

      firstName: _nameSchema.required().description(i18n.__('controllers.user.query.firstName')),

      lastName: _surnameSchema.description(i18n.__('controllers.user.query.lastName')),

      status: _integerSchema.default(0).description(i18n.__('controllers.user.query.status')),

      username: _stringSchema.required().description(i18n.__('controllers.user.query.username')),

      password: _stringSchema.required().description(i18n.__('controllers.user.query.password')),

      email: _emailSchema.required().description(i18n.__('controllers.user.query.email')),
    }),
    options: { abortEarly: false },
  },

  handler: async (request: IRequest, h: IResponse) => {
    const { query } = request;
    let users: any;

    try {
      users = await _add(User, query);
    } catch (e) {
      // throw new Boom(e);
      Boom.badRequest(i18n.__('controllers.session.createUser'), e);
    }
    return h.response(users);
  },
};

export default userCreate;
