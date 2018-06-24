import joi = require("joi");

export type ConfigError = {
  type: "config_error";
  message: string;
};

export const makeConfigError = (key: string) => ({
  type: "config_error",
  message: `Environment variable [${key}] has an invalid value.`
});

export type ValidationError = {
  type: "validation_error";
  message: string;
  details: joi.ValidationErrorItem;
};

export const makeValidationError = (e: joi.ValidationError) => ({
  type: "validation_error",
  message: e.message,
  details: e.details
});
