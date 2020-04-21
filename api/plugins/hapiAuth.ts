import Hapi from "@hapi/hapi"; // eslint-disable-line
import Boom from '@hapi/boom';
import config from "config";
import hapiAuthJwt2 from 'hapi-auth-jwt2';
import { validUser } from '../services/sessionService'; // eslint-disable-line
import { IPlugin } from '../interface/plugin'; // eslint-disable-line

const { ALG_PARAMETER }  = config.get('constants');

const validate = async (credentials: any) => {
  const { id } = credentials;
    let result = {};
    try {
      const user = await validUser(id);
      if (user) {
        result = { isValid: true, credentials };
      }
    } catch (e) {
      Boom.unauthorized(e);
      result = { isValid: false };
    }
    return result;
};

const register = async (server: Hapi.Server) => {
    try {
        await server.register(hapiAuthJwt2);
        server.auth.strategy('jwt', 'jwt', {
            key: process.env.JWT_KEY,
            validate,
            verifyOptions: { algorithms: [ALG_PARAMETER] },
        });
        return;
    } catch (err) {
        console.log(`Error: registering hapi auth plugin: ${err}`);
        return err;
    }
};

const hapiAuth: IPlugin = {
    register,
    name: 'Hapi Auth jwt2',
    version: '1.0.0'
};

export default hapiAuth;
