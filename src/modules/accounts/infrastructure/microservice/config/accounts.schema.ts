import * as Joi from 'joi';

export const accountsSchema = Joi.object({
  ACCOUNTS_PORT: Joi.number().port(),
  ACCOUNTS_HOST: Joi.string().hostname().required(),
  ACCOUNTS_API_KEY: Joi.string(),
});
