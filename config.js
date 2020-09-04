const application = {
  environment: process.env.environment || 'development',
  port: process.env.port || 3000,
  bcryptSalt: process.env.bcryptSalt || 10,
};
const db = {
  database: process.env.dbName || 'template',
  testName: process.env.dbNameTest || 'template_test',
  username: process.env.dbUser || 'template_user',
  password: process.env.dbPassword || 'template_password',
  port: process.env.dbPort || 5432,
  host: process.env.dbHost || 'localhost',
  ssl:
    application.environment === 'production' ||
    application.environment === 'staging',
  type: 'postgres',
};

module.exports = { db, application };
