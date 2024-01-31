import * as Joi from 'joi';

export const transactionsSchema = Joi.object({
  TRANSACTIONS_PORT: Joi.number().port(),
  TRANSACTIONS_HOST: Joi.string().hostname().required(),
  TRANSACTIONS_API_KEY: Joi.string(),
});
