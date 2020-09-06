const application = {
  environment: process.env.environment || 'development',
  port: process.env.port || 3000,
  bcryptSalt: process.env.bcryptSalt || 10,
  twoFaToken: process.env.twoFaToken || 'tsettesttesttsettsetes',
  refreshTokenExpired: process.env.refreshTokenExpired || 6480000000,
  jwtAccessSecret: process.env.jwtAccessSecret || 'secret',
  jwtAccessExpired: process.env.jwtAccessExpired || '15m',
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
