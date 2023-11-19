import bunyan from 'bunyan';

export default {
  env: 'test',
  log: {
    level: bunyan.ERROR,
  },
  db: {
    connection: {
      host: 'localhost',
      database: 'chat',
      password: 'webpassword',
    },
    pool: { min: 2, max: 2 },
    migrations: {
      user: 'postgres',
      password: 'postgrespassword',
    },
  },
};
