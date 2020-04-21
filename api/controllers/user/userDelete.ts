/**
 * @author: Monty Khanna
 */
import Boom from '@hapi/boom';
import { deleteUser } from '../../services/userService'; // eslint-disable-line
import { objectSchema, _integerSchema } from '../../db/schema';
import { i18n } from '../../helpers';
import { IRequest, IResponse } from "../../interface/request"; // eslint-disable-line

const userDelete = {
  auth: {
    strategy: 'jwt',
    scope: ['superAdmin']
  },
  
  tags: ['api', 'User'],

  description: 'Delete user',

  notes: 'delete existing user',

  validate: {
    params: objectSchema({
      id: _integerSchema.description(i18n.__('controllers.user.id')),
    }),
    options: { abortEarly: false, stripUnknown: true },
  },

  handler: async (request: IRequest, h: IResponse) => {    
    try {
      const data: any = await deleteUser(request.params);
      if (data.notExist) {
        return Boom.badRequest(i18n.__('controllers.user.userNotExist'));
      }
      return h.response({ data });
    } catch (e) {
      return Boom.badRequest(i18n.__('controllers.user.deleteUser'), e);
    }
  },
};

export default userDelete;
