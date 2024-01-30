import { registerAs } from '@nestjs/config';

export const accountsLoader = registerAs('accounts', () => ({
  port: parseInt(process.env.ACCOUNTS_PORT, 10),
  host: process.env.ACCOUNTS_HOST,
  apiKey: process.env.ACCOUNTS_API_KEY,
}));
