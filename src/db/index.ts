import { createConnection, Connection } from 'typeorm';
import { db } from '../../config';

const {
  database,
  port,
  password,
  host,
  ssl,
  type,
  username,
}: {
  database: string;
  port: number | string;
  password: string;
  host: string;
  ssl: boolean;
  type: 'postgres';
  username: string;
} = db;

export default (async function instance() {
  await createConnection({
    type,
    host,
    port,
    username,
    password,
    database,
    entities: [],
    logger: 'simple-console',
    extra: {
      ssl,
    },
  });
})();
