/**
 * @author {[Monty Khanna]}
 */
import Boom from '@hapi/boom';
import { getUser } from '../../services/sessionService'; // eslint-disable-line
import { i18n } from '../../helpers'; // eslint-disable-line
import { IRequest, IResponse } from '../../interface/request'; // eslint-disable-line

const sessionGet = {
  plugins: {
    'hapi-swagger': {
      payloadType: 'form',
    },
  },
  
  auth: {
    strategy: 'jwt',
    scope: ['superAdmin', 'admin']
  },
  
  tags: ['api', 'Session'],
  
  description: 'GET session user',
  
  notes: 'Returns logged in session user',
  
  handler: async (request: IRequest, h: IResponse) => {
    try {
      const { auth: { credentials: { id } } } = request;
      const data = await getUser(id);
      return h.response({ data });
    } catch (e) {
      return Boom.badRequest(i18n.__('controllers.user.fetchUser'), e);
    }
  },
};

export default sessionGet;