/**
 * @author: Monty Khanna
 */
import Boom from '@hapi/boom';
import config from "config";
import { getRoleList } from '../../services/roleService';
import { objectSchema, _integerSchema, _stringSchema } from '../../db/schema';
import { i18n } from '../../helpers';
import { IRequest, IResponse } from '../../interface/request'; // eslint-disable-line

const { DEFAULT_OFFSET, DEFAULT_ORDER }  = config.get('constants');

const roleList = {
  auth: false,

  tags: ['api', 'Role'],

  description: 'Get All Role',

  notes: 'get details of all Role',

  validate: {
    query: objectSchema({
      limit: _integerSchema.default(DEFAULT_OFFSET).description(i18n.__('controllers.role.limit')),

      sortBy: _stringSchema.default('name').description(i18n.__('controllers.role.sortBy')),

      order: _stringSchema.default(DEFAULT_ORDER).description(i18n.__('controllers.role.order')),
    }),
    options: { abortEarly: false, stripUnknown: true },
  },

  handler: async (request: IRequest, h: IResponse) => {
    const { query } = request;
    try {
      const data: any = await getRoleList(query);
      return h.response({ data });
    } catch (e) {
      return Boom.badRequest(i18n.__('controllers.role.fetchRole'), e);
    }
  },
};

export default roleList;
