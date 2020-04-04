/**
 * @author: Monty Khanna
 */
import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import config from "config";
import db from '../../db';
import { _getListWithCount } from '../../db/repositories';
import { _integerSchema, _stringSchema } from '../../db/schema';
import { i18n } from '../../helpers';
import { IRequest, IResponse } from '../../interface/request';

const { DEFAULT_OFFSET }  = config.get('constants');
const { Role } = db.models;

const roleList = {
  auth: false,

  tags: ['api', 'Role'],

  description: 'Get All Role',

  notes: 'get details of all Role',

  validate: {
    query: joi.object({
      limit: _integerSchema.default(DEFAULT_OFFSET).description(i18n.__('controllers.user.query.limit')),

      sortBy: _stringSchema.default('name').description(i18n.__('controllers.user.query.sortBy')),

      order: _stringSchema.default('asc').description(i18n.__('controllers.user.query.order')),
    }),
    options: { abortEarly: false },
  },

  handler: async (request: IRequest, h: IResponse) => {
    const { limit, sortBy, order } = request.query;
    const queryString = {
      where: { status: true, isDeleted: false },
      limit,
      order: [[sortBy, order]],
    };

    try {
      const data: any = await _getListWithCount(Role, queryString);
      return h.response({ data });
    } catch (e) {
      // throw new Boom(e);
      Boom.badRequest(i18n.__('controllers.user.fetchUser'), e);
    }
  },
};

export default roleList;
