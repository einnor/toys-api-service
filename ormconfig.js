const logLevel = ['error', 'warn', 'schema'];

if (process.env.DEBUG === 'true' && process.env.NODE_ENV === 'development') {
  logLevel.push('query');
}

module.exports = {
   "type": "mysql",
   "host": process.env.DB_HOST,
   "port": process.env.DB_PORT,
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME,
   "synchronize": true,
   "logging": logLevel,
   cache: {
      type:       'redis',
      duration:   30000,
      options: {
        host:     process.env.REDIS_HOST || '',
        port:     process.env.REDIS_PORT || ''
      }
    },
   "entities": [
      "dist/entity/**/*.js"
   ],
   "migrations": [
      "dist/migration/**/*.js"
   ],
   "subscribers": [
      "dist/subscriber/**/*.js"
   ],
   "cli": {
      "entitiesDir": "dist/entity",
      "migrationsDir": "dist/migration",
      "subscribersDir": "dist/subscriber"
   }
}