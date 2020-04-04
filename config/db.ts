module.exports = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "Bohemia00&",
    database: process.env.DB_DATABASE || "gettingStartedTypeScript",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
      min: 20,
      max: 30,
      idle: 30000,
      acquire: 300000,
      idleTimeoutMillis: 300000,
    },
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres"
  }
};
