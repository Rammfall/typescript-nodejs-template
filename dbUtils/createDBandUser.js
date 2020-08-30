// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Client } = require('pg');

const {
  database,
  username,
  password,
  host,
  port,
  testName,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('../config').db;

const client = new Client({
  host,
  port,
  user: process.env.user || 'postgres',
  password: process.env.password || 'admin',
  database: process.env.db || 'postgres',
});

(async () => {
  await client.connect();
  await client.query(`CREATE DATABASE ${database};`);
  await client.query(`CREATE DATABASE ${testName};`);
  await client.query(
    `CREATE USER ${username} WITH ENCRYPTED PASSWORD '${password}';`
  );
  await client.query(
    `GRANT ALL PRIVILEGES ON DATABASE ${database} TO ${username};`
  );
  await client.query(
    `GRANT ALL PRIVILEGES ON DATABASE ${testName} TO ${username};`
  );
  await client.end();
  // eslint-disable-next-line no-console
  console.log('Databases and user was created');
})();
