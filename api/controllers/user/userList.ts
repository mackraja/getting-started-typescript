/**
 * @author: Monty Khanna
 */
import Boom from '@hapi/boom';
import config from "config";
import { listUser } from '../../services/userService';
import { objectSchema, _integerSchema, _stringSchema } from '../../db/schema';
import { i18n } from '../../helpers';
import { IRequest, IResponse } from '../../interface/request'; // eslint-disable-line

const { DEFAULT_OFFSET, DEFAULT_ORDER }  = config.get('constants');

const userList = {
  auth: {
    strategy: 'jwt',
    scope: ['admin']
  },

  tags: ['api', 'User'],

  description: 'Get All Users',

  notes: 'get details of all users',

  validate: {
    query: objectSchema({
      limit: _integerSchema.default(DEFAULT_OFFSET).description(i18n.__('controllers.user.limit')),

      sortBy: _stringSchema.default('firstName').description(i18n.__('controllers.user.sortBy')),

      order: _stringSchema.default(DEFAULT_ORDER).description(i18n.__('controllers.user.order')),
    }),
    options: { abortEarly: false, stripUnknown: true },
  },

  handler: async (request: IRequest, h: IResponse) => {
    try {
      const data: any = await listUser(request.query);
      return h.response({ data });
    } catch (e) {
      return Boom.badRequest(i18n.__('controllers.user.fetchUser'), e);
    }
  },
};

export default userList;
