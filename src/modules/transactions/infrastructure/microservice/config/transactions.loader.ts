import { registerAs } from '@nestjs/config';

export const transactionsLoader = registerAs('transactions', () => ({
  port: parseInt(process.env.TRANSACTIONS_PORT, 10),
  host: process.env.TRANSACTIONS_HOST,
  apiKey: process.env.TRANSACTIONS_API_KEY,
}));
