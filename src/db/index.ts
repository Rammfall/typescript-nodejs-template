import { createConnection, ConnectionOptions } from 'typeorm';

import { db } from '../../config';
import User from './entity/User';
import UserSession from './entity/UserSession';
import { ENV } from '../config/application';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
  port: number | undefined;
  password: string;
  host: string;
  ssl: boolean;
  type: 'postgres';
  username: string;
} = db;

const connection: ConnectionOptions = {
  database,
  type,
  port,
  username,
  password,
  host,
  entities: [User, UserSession],
  extra: {
    ssl,
  },
};

export default (async function instance() {
  await createConnection(connection);

  if (ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log('DB connect in application');
  }
})();
