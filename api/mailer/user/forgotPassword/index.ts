import { send } from '../../smtp';
import config from 'config';

const url = config.get('basePath');

const index: any = (user: any) => {  
  const subject = 'Reset Password';
  const resetPassLink = `${url}/reset/password/${user.token}`;
  const htmlLocals = Object.assign({}, user, { resetPassLink });
  return send(user.email, '', '', '', subject, htmlLocals, __dirname, []);
};

export default index;