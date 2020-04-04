/**
 * @author: Monty Khanna
 */
import * as Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import Good from '@hapi/good';
import HapiSwagger from 'hapi-swagger';
import * as rootPackage from '../package.json';
import { hapiRoute as HapiRoute } from './plugins';

const hapiSwaggerOptions: HapiSwagger.RegisterOptions = {
    pathPrefixSize: 1,
    grouping: 'tags',
    sortTags: 'alpha',
    expanded: 'none',
    info: {
        title: `${rootPackage.name} Documentation`,
        version: rootPackage.version,
        contact: {
            name: 'Monty Khanna',
            email: 'montykhanna007@hotmail.com',
        },
    },
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    schemes: (process.env.NODE_ENV || 'development') !== 'development' ? ['https'] : ['http'],
};

const goodOptions = {
    ops: {
        interval: 1000,
    },
    reporters: {
        myConsoleReporter: [{
            module: '@hapi/good-squeeze',
            name: 'Squeeze',
            args: [{log: '*', response: '*', error: '*'}],
        }, {
            module: '@hapi/good-console',
        }, 'stdout']
    },
};

const visionOptions = {
    engines: {
        html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'public',
};

const corsHeaders = {
    origin: ["*"],
    headers: [
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Headers",
        "Access-Control-Request-Method",
        "Accept",
        "Content-Type",
        "If-None-Match",
        "Access-Control-Request-Headers",
        "Connection, Host, Origin, X-Requested-With, Content-Type",
        "Authorization",
        "RefreshToken"
    ],
    credentials: true
};

export const connections = {
    routes: { cors: corsHeaders }
};

export const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
    {
        plugin: Inert
    },
    {
        plugin: Vision,
        options: visionOptions,
    },
    {
        plugin: HapiSwagger,
        options: hapiSwaggerOptions,
    },
    {
        plugin: HapiRoute,
        options: {
            cwd: __dirname,
            routes: 'controllers/**/*Controller.ts',
        },
    },
    {
        plugin: Good,
        options: goodOptions,
    }
];
