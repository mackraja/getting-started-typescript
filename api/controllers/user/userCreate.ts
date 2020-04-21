/**
 * @author: Monty Khanna
 */
import Boom from '@hapi/boom';
import { addUser } from '../../services/userService'; // eslint-disable-line
import {
  objectSchema,
  _nameSchema,
  _surnameSchema,
  _integerSchema,
  _stringSchema,
  _emailSchema,
} from '../../db/schema';
import { i18n } from '../../helpers';
import { IRequest, IResponse } from "../../interface/request"; // eslint-disable-line

const userCreate = {
  plugins: {
    'hapi-swagger': {
      payloadType: 'form',
    },
  },

  auth: {
    strategy: 'jwt',
    scope: ['superAdmin']
  },

  tags: ['api', 'User'],

  description: 'Create User',

  notes: 'Create new user',

  validate: {
    payload: objectSchema({
      roleId: _integerSchema.required().description(i18n.__('controllers.user.roleId')),

      firstName: _nameSchema.required().description(i18n.__('controllers.user.firstName')),

      lastName: _surnameSchema.description(i18n.__('controllers.user.lastName')),

      status: _integerSchema.default(0).description(i18n.__('controllers.user.status')),

      userName: _stringSchema.required().description(i18n.__('controllers.user.userName')),

      password: _stringSchema.required().description(i18n.__('controllers.user.password')),

      email: _emailSchema.required().description(i18n.__('controllers.user.email')),
    }),
    options: { abortEarly: false, stripUnknown: true },
  },

  handler: async (request: IRequest, h: IResponse) => {
    const { payload } = request;

    try {
      let data: any = {};
      data = await addUser(payload);
      if (data.isEmailExist) {
        return Boom.badRequest(i18n.__('controllers.user.emailExists'));
      }
      return h.response({ data });
    } catch (e) {
      return Boom.badRequest(i18n.__('controllers.session.createUser'), e);
    }
  },
};

export default userCreate;
