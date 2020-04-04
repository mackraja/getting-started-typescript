import Hapi from "@hapi/hapi";
import glob from "glob";
import { IPlugin, IPluginOptions } from '../interface/plugin';

const toString = {}.toString;
const isArray = (arr: any) => toString.call(arr) == '[object Array]';
const castArray = (value: any) => isArray(value) ? value : [value];

const register = async (server: Hapi.Server, options: IPluginOptions) => {
    try {
        const globOptions = {
            nodir: true,
            strict: true,
            cwd: options.cwd || process.cwd(),
            ignore: options.ignore
        };
        castArray(options.routes).forEach((pattern: any) => {
            let files = glob.sync(pattern, globOptions);
            files.forEach(function (file) {
                const route = require(globOptions.cwd + '/' + file);
                server.route(route.default || route)
            });
        });
        return;
    } catch (err) {
        console.log(`Error registering hapi router plugin: ${err}`);
        throw err;
    }
};
const hapiRoute: IPlugin = {
    register,
    name: "Hapi Route",
    version: "1.0.0"
};

export default hapiRoute;
