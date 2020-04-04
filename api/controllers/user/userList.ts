/**
 * @author: Monty Khanna
 */
import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import config from "config";
import db from '../../db';
import { _getList } from '../../db/repositories';
import { _integerSchema, _stringSchema } from '../../db/schema';
import { i18n } from '../../helpers';
import { IRequest, IResponse } from '../../interface/request';

const { DEFAULT_OFFSET }  = config.get('constants');
const { User, Role } = db.models;

const userList = {
  auth: false,

  tags: ['api', 'User'],

  description: 'Get All Users',

  notes: 'get details of all users',

  validate: {
    query: joi.object({
      limit: _integerSchema.default(DEFAULT_OFFSET).description(i18n.__('controllers.user.query.limit')),

      sortBy: _stringSchema.default('firstName').description(i18n.__('controllers.user.query.sortBy')),

      order: _stringSchema.default('asc').description(i18n.__('controllers.user.query.order')),
    }),
    options: { abortEarly: false },
  },

  handler: async (request: IRequest, h: IResponse) => {
    const { limit, sortBy, order } = request.query;
    const queryString = {
      include: [{
        model: Role
      }],
      where: { status: true, isDeleted: false },
      limit,
      order: [[sortBy, order]],
    };

    try {
      const data: any = await _getList(User, queryString);
      return h.response({ data });
    } catch (e) {
      // throw new Boom(e);
      Boom.badRequest(i18n.__('controllers.user.fetchUser'), e);
    }
  },
};

export default userList;
