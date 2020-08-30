const {
  username,
  password,
  host,
  port,
  database,
  ssl,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('./config').db;

const path = 'src/db/';

module.exports = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize: true,
  logging: ['query'],
  entities: [`${path}entity/**/*.ts`],
  migrations: [`${path}migration/**/*.ts`],
  subscribers: [`${path}subscriber/**/*.ts`],
  cli: {
    entitiesDir: `${path}entity`,
    migrationsDir: `${path}migration`,
    subscribersDir: `${path}subscriber`,
  },
  extra: {
    ssl,
  },
};
