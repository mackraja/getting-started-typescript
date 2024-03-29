import { Sequelize } from 'sequelize-typescript';
import config from 'config'

const { dialect } = config.get('db');
let db: any;

if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    db = new Sequelize(process.env.DATABASE_URL,
        {
            dialect,
            protocol: dialect,
            modelPaths: [__dirname + '/models'],
            dialectOptions: {
                ssl: {      /* <----- Add SSL option */
                  require: true,
                  rejectUnauthorized: false 
                }
              },
        });
} else {
    const { host, database, username, password } = config.get('db');
    db = new Sequelize({
        dialect,
        host,
        database,
        username,
        password,
        modelPaths: [__dirname + '/models']
    });
}

export default db;
