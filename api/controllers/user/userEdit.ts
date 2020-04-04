/**
 * @author: Monty Khanna
 */
import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import db from '../../db';
import { _update } from '../../db/repositories'; // eslint-disable-line
import {
  _nameSchema,
  _surnameSchema,
  _integerSchema,
  _stringSchema,
  _emailSchema,
} from '../../db/schema';
import { i18n } from '../../helpers';
import {IRequest, IResponse} from "../../interface/request";
import userCreate from "./userCreate"; // eslint-disable-line

const { User } = db.models;
const roleIdArr = [1, 2, 3];

const userEdit = {
  auth: false,

  plugins: {
    'hapi-swagger': {
      payloadType: 'form',
    },
  },

  tags: ['api', 'User'],

  description: 'Create User',

  notes: 'Create new user',

  validate: {
    params: joi.object({
      id: _integerSchema.description(i18n.__('controllers.user.params.id')),
    }),
    payload: joi.object({
      roleId: _integerSchema
        .valid(roleIdArr)
        .description(i18n.__('controllers.user.query.roleId')),

      firstName: _nameSchema.description(i18n.__('controllers.user.query.firstName')),

      lastName: _surnameSchema.description(i18n.__('controllers.user.query.lastName')),

      status: _integerSchema.description(i18n.__('controllers.user.query.status')),

      username: _stringSchema.description(i18n.__('controllers.user.query.username')),

      password: _stringSchema.description(i18n.__('controllers.user.query.password')),

      email: _emailSchema.description(i18n.__('controllers.user.query.email')),
    }),
    options: { abortEarly: false },
  },

  handler: async (request: IRequest, h: IResponse) => {
    const { params, payload } = request;
    const { id } = params;
    let isUpdated: any;

    try {
      isUpdated = await _update(User, payload, { where: { id } });
    } catch (e) {
      // throw new Boom(e);
      Boom.badRequest(i18n.__('controllers.user.updateUser'), e);
    }
    return h.response(isUpdated);
  },
};

export default userEdit;
