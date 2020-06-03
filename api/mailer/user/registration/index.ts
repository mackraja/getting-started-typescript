import { send } from '../../smtp';
import config from 'config';

const url = config.get('basePath');

const index: any = (user: {inviteToken: string, email: string, name: string }) => {  
  const invitelink = `${url}/accept/invitation/${user.inviteToken}`;
  const subject = ' Welcome ' + name;
  const locals = Object.assign({}, user, { invitelink } );
  return send(user.email, '', '', '', subject, locals, __dirname, []);
};

export default index;