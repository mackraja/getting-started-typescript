import { send } from '../../smtp';
import config from 'config';

interface welcomeProps {
  role: number,
  name: string,
  inviteToken: string,
  contactUs: string,
  email: string
}

const fileObj: any = {
  1: "superAdmin",
  2: "admin",
};

const url = config.get('basePath');

const index: any = (welcome: welcomeProps) => {
  const subject = ' Welcome ' + welcome.name;
  const link = `${url}/accept/invitation/${welcome.inviteToken}`;

  const htmlLocals = Object.assign({}, welcome, { link, contactUs: welcome.contactUs } );
  const fileDir = __dirname + '/' + fileObj[welcome.role];
  return send(welcome.email, '', '', '', subject, htmlLocals, fileDir, []);
};

export default index;
