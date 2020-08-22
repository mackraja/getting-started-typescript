/**
 * @author: Monty Khanna
 */
import Boom from '@hapi/boom';
import { updateUser } from '../../services/userService'; // eslint-disable-line
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

const userEdit = {
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

  description: 'Update User',

  notes: 'Update existing user',

  validate: {
    params: objectSchema({
      id: _integerSchema.description(i18n.__('controllers.user.id')),
    }),
    payload: objectSchema({
      firstName: _nameSchema.required().description(i18n.__('controllers.user.firstName')),

      lastName: _surnameSchema.description(i18n.__('controllers.user.lastName')),

      status: _integerSchema.default(1).description(i18n.__('controllers.user.status')),

      email: _emailSchema.required().description(i18n.__('controllers.user.email')),
    }),
    options: { abortEarly: false, stripUnknown: true },
  },

  handler: async (request: IRequest, h: IResponse) => {
    const { params, payload } = request;

    try {
      let data: any = {};
      data = await updateUser(params, payload);
      if (data.isEmailExist) {
        return Boom.badRequest(i18n.__('controllers.user.emailExists'));
      }
      return h.response({ data });
    } catch (e) {
      return Boom.badRequest();
    }
  },
};

export default userEdit;
