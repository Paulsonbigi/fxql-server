import * as Joi from 'joi';

export const GlobalConfig = () => ({
  typeorm: {
    url: process.env.DATABASE_URL,
    logging: process.env.ENABLE_DATABASE_LOGGING
      ? process.env.ENABLE_DATABASE_LOGGING === 'true'
      : false,
    ssl: process.env.ENABLE_DATABASE_SSL
      ? process.env.ENABLE_DATABASE_SSL === 'true'
      : false,
  },
  server: {
    port: process.env.SERVER_PORT || '8080',
    env: process.env.NODE_ENV || 'development',
    // defaultConsumers: process.env.SERVER_DEFAULT_CONSUMERS,
  },
  security: {
    throttler: {
      ttl: process.env.DEFAULT_THROTTLER_TTL || 60 * 1000,
      limit: process.env.DEFAULT_THROTTLER_LIMIT || 100,
    },
  },
});

export const GlobalConfigValidationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  SERVER_PORT: Joi.string().required(),
  NODE_ENV: Joi.string().required(),
  REFRESH_JWT_SECRET: Joi.string().required(),
  ENABLE_DATABASE_LOGGING: Joi.string().required(),
  ENABLE_DATABASE_SSL: Joi.string().required(),
  DEFAULT_THROTTLER_TTL: Joi.string().required(),
  DEFAULT_THROTTLER_LIMIT: Joi.string().required(),
});
