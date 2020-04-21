/**
 * @author: Monty Khanna
 */
import { IRequest, IResponse } from '../../interface/request'; // eslint-disable-line

const sessionDestroy = {
  auth: 'jwt',

  tags: ['api', 'Session'],

  description: 'Destroy Session',

  notes: 'Logout user from system',

  handler: (request: IRequest, h: IResponse) => {
    // Hapi Auth Jwt2
    // unset the state from client side.
    return h.response('User Successfully Logout.');
  },
};


export default sessionDestroy;