import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
  jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtAccessExpirationTime: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwtRefreshExpirationTime: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
}));
