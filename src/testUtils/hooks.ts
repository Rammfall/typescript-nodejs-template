import { Connection, getConnection } from 'typeorm';

export const beforeAllHook = async (): Promise<Connection> => {
  return await getConnection().connect();
};

export const afterAllHook = async (): Promise<void> => {
  return await getConnection().close();
};
