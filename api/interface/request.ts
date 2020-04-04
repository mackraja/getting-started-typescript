import Hapi from "@hapi/hapi";

export interface ICredentials extends Hapi.AuthCredentials {
  id: string;
  role: number;
}

export interface IRequestAuth extends Hapi.RequestAuth {
  credentials: ICredentials;
}

export interface IRequestAuth extends Hapi.Request {
  auth: IRequestAuth;
}

export interface IRequest extends Hapi.RequestOrig {
  auth: IRequestAuth;
  payload: any;
  params: any;
  query: any;
  server: any;
  raw: any;
}

export interface IResponse extends Hapi.ResponseToolkit {}
