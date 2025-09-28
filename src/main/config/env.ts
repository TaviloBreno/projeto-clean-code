export const env = {
  port: process.env['PORT'] ?? 3000,
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  jwtSecret: process.env['JWT_SECRET'] ?? 'secret',
  facebookClientId: process.env['FACEBOOK_CLIENT_ID'] ?? 'facebook_client_id',
  facebookClientSecret: process.env['FACEBOOK_CLIENT_SECRET'] ?? 'facebook_client_secret',
  dbHost: process.env['DB_HOST'] ?? 'localhost',
  dbPort: parseInt(process.env['DB_PORT'] ?? '5432'),
  dbUser: process.env['DB_USER'] ?? 'postgres',
  dbPass: process.env['DB_PASS'] ?? 'password',
  dbName: process.env['DB_NAME'] ?? 'facebook_login'
}
