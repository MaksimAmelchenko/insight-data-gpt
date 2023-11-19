export default {
  env: 'development-local',
  log: {
    level: 'trace',
  },
  db: {
    connection: {
      host: 'localhost',
      database: 'chat',
      password: 'webpassword',
    },
    migrations: {
      user: 'postgres',
      password: 'postgrespassword',
    },
  },
};
