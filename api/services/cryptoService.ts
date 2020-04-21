import crypto from "crypto";

/**
 * Used to get salt
 */
export const getSalt = () => crypto.randomBytes(128).toString('base64');

/**
 * Used to get token
 */
export const getToken = () => crypto.randomBytes(Math.ceil(256/2)).toString('hex').slice(0,255).toUpperCase();

/**
 * Used to hash password using salt
 * @param password 
 * @param salt 
 */
export const hashPassword = (password: any, salt: any) => new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
		if (err) { reject(err); }
      resolve(derivedKey.toString('hex'));
    });
});

