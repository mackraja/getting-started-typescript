/**
 * @author: Monty Khanna
 */
import joi from '@hapi/joi';

export const _stringSchema = joi.string();
export const objectSchema = (obj: any) => joi.object(obj);
export const _alphaNumSchema = joi.string().alphanum();
export const _integerSchema = joi.number().integer();
export const _nameSchema = _alphaNumSchema.min(2).max(30);
export const _surnameSchema = _alphaNumSchema.min(2).max(50);
export const _birthDate = joi.date().min('1-1-1900').max('1-1-2012');
export const _birthYearSchema = _integerSchema.min(1900).max(2012);
export const _emailSchema = _stringSchema.email();
export const _ipSchema = _stringSchema.ip();
export const _creditCardSchema = _stringSchema.creditCard();
export const _tokenSchema = _stringSchema.token().length(32).required()
    .error(() => 'Invalid token');
