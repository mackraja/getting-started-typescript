/**
 * @author: Monty Khanna
 */
import bcrypt from 'bcrypt';

const generatePass = async (pass: any) => {
  const generateSalt = await bcrypt.genSalt(10);
  const generateHash = await bcrypt.hash(pass, generateSalt);

  return generateHash;
};

const comparePass = async (requestPass: any, dbPass: any) => await bcrypt.compare(requestPass, dbPass);

export = {
  generatePass,
  comparePass,
};
