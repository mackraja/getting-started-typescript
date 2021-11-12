/**
 * @author: Monty Khanna
 */
import dotenv from 'dotenv';
dotenv.config();
import Hapi from '@hapi/hapi';
import { connections, plugins } from './manifest';
import { checkDbConnection } from './helpers/authenticate';
import { name as serverName } from '../package.json';

// console.table(dotenv.config());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

const init = async () => {
    const serverOptions = Object.assign({}, {
        host,
        port 
    }, connections);
    // @ts-ignore
    const server: Hapi.Server = Hapi.server(serverOptions);
    // @ts-ignore
    await server.register(plugins);
    // Base Route
    server.route({
        method: 'GET',
        path: '/',
        handler:  {
            view: 'welcome'
        },
    });
    // Server Extension
    server.ext('onPreResponse', function (request: any, h: any) {
        let response = request.response;
        if (!response.isBoom) {
            return h.continue;
        }
        // Overriding Insufficient scope message
        if (response.output.payload.message == "Insufficient scope") {
            response.output.payload.message = "Session Timed Out";
        }
        return h.continue;
    });
    // Check Health
    await checkDbConnection();
    console.info('\n==> ✅ Connection has been established successfully !!');
    // Start Server
    await server.start();
    console.info('\n==> ✅  %s is running, talking to API server on port %s.', serverName, port);
    console.info('\n==> 💻  Open %s%s in a browser to view the api docs.\n\n', server.info.uri, '/documentation');
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
// node -e "console.log(require('crypto').randomBytes(512).toString('base64'));"
