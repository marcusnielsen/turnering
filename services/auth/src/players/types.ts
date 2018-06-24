import joi = require("joi");

export type CreateArgs = {
  idempotencyKey: string;
  email: string;
};

export type JwtFailed = Error;

export type ValidationFailed = joi.ValidationErrorItem;

export type CreateFailed = ValidationFailed | JwtFailed;

export type CreateSucceeded = {
  jwt: string;
};

export type AuthenticateArgs = {
  idempotencyKey: string;
  jwt: string;
};
