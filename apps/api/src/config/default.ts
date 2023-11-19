export default {
  appName: 'chat',
  port: 3000,
  log: {
    level: 'trace',
  },
  db: {
    client: 'pg',
    connection: {
      host: 'DB__CONNECTION__HOST',
      database: 'DB__CONNECTION__DATABASE',
      user: 'chat_web',
      password: 'DB__CONNECTION__PASSWORD',
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      user: 'POSTGRES_USER',
      password: 'POSTGRES_PASSWORD',
      directory: './src/migrations',
      tableName: 'migrations',
    },
  },
  auth: {
    jwtSecret: 'AUTH__JWT_SECRET',
  },
};
