/**
 * @author: Monty Khanna
 */
import Boom from '@hapi/boom';
import config from "config";
import { getFizzBuzz } from '../../services/programService';
import { objectSchema, _integerSchema, _stringSchema } from '../../db/schema';
import { i18n } from '../../helpers';
import { IRequest, IResponse } from '../../interface/request'; // eslint-disable-line

const { DEFAULT_OFFSET, DEFAULT_ORDER }  = config.get('constants');

const roleList = {
  auth: false,

  tags: ['api', 'Programs'],

  description: 'Fizz Buzz Program',

  notes: 'get fizz, buzz, fizzbuzz based on count',

  validate: {
    params: objectSchema({
      count: _integerSchema.description(i18n.__('controllers.program.count')),
    }),
    options: { abortEarly: false, stripUnknown: true },
  },

  handler: (request: IRequest, h: IResponse) => {
    const { params } = request;
    try {
      const data = getFizzBuzz(params);
      return h.response({ data });
    } catch (e) {
      return Boom.badRequest(i18n.__('controllers.role.fetchRole'), e);
    }
  },
};

export default roleList;
