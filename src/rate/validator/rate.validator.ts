import * as Joi from 'joi';

export const createRateValidator = Joi.object().keys({
  SourceCurrency: Joi.string()
    .trim()
    .length(3)
    .required()
    .messages({
      'string.base': `Source currency should be a type of 'string'`,
      'any.required': `Source currency cannot be empty`,
      'string.length': `Source currency must be exactly 3 characters`,
    })
    .custom((value: any, helpers: any) => {
      if (value !== value.toUpperCase()) {
        return helpers.error('any.custom', {
          customMessage: `Invalid: '${value}' should be '${value.toUpperCase()}'`,
        });
      }
      return value;
    }),
  DestinationCurrency: Joi.string()
    .trim()
    .length(3)
    .required()
    .messages({
      'string.base': `Source currency should be a type of 'string'`,
      'any.required': `Source currency cannot be empty`,
      'string.length': `Source currency must be exactly 3 characters`,
    })
    .custom((value: any, helpers: any) => {
      if (value !== value.toUpperCase()) {
        return helpers.error('any.custom', {
          customMessage: `Invalid: '${value}' should be '${value.toUpperCase()}'`,
        });
      }
      return value;
    }),
  CapAmount: Joi.required()
    .custom((value: any, helpers: any) => {
      if (typeof value !== 'number') {
        return helpers.error('any.invalid', { value });
      }
      if (value < 0) {
        return helpers.error('any.negative', { value });
      }
      return value;
    })
    .messages({
      'any.invalid': `Invalid: '{{#value}}' is not a valid numeric amount`,
      'any.negative': `Invalid: CAP cannot be a negative number`,
      'any.required': `Invalid: Empty FXQL statement`,
    }),
  BUY: Joi.required()
    .custom((value: any, helpers: any) => {
      if (typeof value !== 'number') {
        return helpers.error('any.invalid', { value });
      }
      if (value < 0) {
        return helpers.error('any.negative', { value });
      }
      return value;
    })
    .messages({
      'any.invalid': `Invalid: '{{#value}}' is not a valid numeric amount`,
      'any.negative': `Invalid: BUY cannot be a negative number`,
      'any.required': `Invalid: Empty FXQL statement`,
    }),
  SELL: Joi.required()
    .custom((value: any, helpers: any) => {
      if (typeof value !== 'number') {
        return helpers.error('any.invalid', { value });
      }
      if (value < 0) {
        return helpers.error('any.negative', { value });
      }
      return value;
    })
    .messages({
      'any.invalid': `Invalid: '{{#value}}' is not a valid numeric amount`,
      'any.negative': `Invalid: SELL cannot be a negative number`,
      'any.required': `Invalid: Empty FXQL statement`,
    }),
});
