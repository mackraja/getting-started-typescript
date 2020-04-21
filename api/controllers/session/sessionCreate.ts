/**
 * @author: Monty Khanna
 */
import Boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import config from "config";
import { authenticate } from '../../services/sessionService'; // eslint-disable-line
import { hashPassword } from '../../services/cryptoService'; // eslint-disable-line
import {
  objectSchema,
  _stringSchema
} from '../../db/schema';
import { i18n } from '../../helpers';
import { IRequest, IResponse } from "../../interface/request"; // eslint-disable-line

const { ALG_PARAMETER, EXPIRE_AT }  = config.get('constants');

const sessionCreate = {
  plugins: {
    'hapi-swagger': {
      payloadType: 'form',
    },
  },

  auth: false,

  tags: ['api', 'Session'],

  description: 'Create Session',

  notes: 'Create new user session',

  validate: {
    payload: objectSchema({
      userName: _stringSchema.required().description(i18n.__('controllers.user.userName')),

      password: _stringSchema.required().description(i18n.__('controllers.user.password')),
    }),
    options: { abortEarly: false, stripUnknown: true },
  },

  handler: async (request: IRequest, h: IResponse) => {
    try {
      const { payload } = request;
      const { userName, password } = payload;
      const user = await authenticate(userName);

      // Check User Exist or Not
      if (!user) {
        return Boom.unauthorized(i18n.__('controllers.session.invalidUsername'));
      }

      // Check Active User
      if (!user.status) {
        return Boom.unauthorized(i18n.__('controllers.session.inactive'));
      }

      // Match Password
      const hashedPassword = await hashPassword(password, user.salt);
      if (hashedPassword !== user.password) {
        return Boom.badRequest(i18n.__('controllers.session.invalidPassword'));
      }

      // Generate Token
      const credentials = { id: user.id, userName, scope: [user.role.name] };
      const jwtOptions = { algorithm: ALG_PARAMETER, expiresIn: EXPIRE_AT };
      const token = jwt.sign(credentials, process.env.JWT_KEY, jwtOptions);
      return h.response({ data: { id: user.id, token } });
    } catch (e) {
      return Boom.badRequest(i18n.__('controllers.session.createSession'), e);
    }
  },
};

export default sessionCreate;
