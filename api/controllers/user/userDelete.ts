/**
 * @author: Monty Khanna
 */
import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import db from '../../db';
import { _delete } from '../../db/repositories';
import { _integerSchema } from '../../db/schema';
import { i18n } from '../../helpers';
import {IRequest, IResponse} from "../../interface/request";

const { User } = db.models;

const userDelete = {
  auth: false,

  tags: ['api', 'User'],

  description: 'Delete user',

  notes: 'delete existing user',

  validate: {
    params: joi.object({
      id: _integerSchema.description(i18n.__('controllers.user.params.id')),
    }),
    options: { abortEarly: false },
  },

  handler: async (request: IRequest, h: IResponse) => {
    const { id } = request.params;
    const queryString = { where: { id } };
    let delUser: any;

    try {
      delUser = await _delete(User, queryString);
    } catch (e) {
      // throw new Boom(e);
      Boom.badRequest(i18n.__('controllers.user.deleteUser'), e);
    }
    return h.response(delUser);
  },
};

export default userDelete;
