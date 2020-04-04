import Hapi from "@hapi/hapi";

export interface IPluginOptions {
  routes?: string | [],
  ignore?: string | [],
  cwd?: string,
}

export interface IPlugin {
  register(server: Hapi.Server, options?: IPluginOptions): Promise<void>;
  name: string;
  version: string;
}
