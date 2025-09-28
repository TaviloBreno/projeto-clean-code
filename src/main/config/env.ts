export const env = {
  port: process.env['PORT'] ?? 3000,
  jwtSecret: process.env['JWT_SECRET'] ?? 'secret',
  facebookClientId: process.env['FACEBOOK_CLIENT_ID'] ?? 'facebook_client_id',
  facebookClientSecret: process.env['FACEBOOK_CLIENT_SECRET'] ?? 'facebook_client_secret',
  dbHost: process.env['DB_HOST'] ?? 'localhost',
  dbPort: process.env['DB_PORT'] ?? 3306,
  dbUser: process.env['DB_USER'] ?? 'root',
  dbPass: process.env['DB_PASS'] ?? '',
  dbName: process.env['DB_NAME'] ?? 'facebook_login'
}
