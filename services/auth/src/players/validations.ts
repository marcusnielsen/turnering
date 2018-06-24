import joi = require("joi");
import { validate } from "../utils";

const idempotencyObj = {
  idempotencyKey: joi.string().guid({ version: ["uuidv1"] })
};

const createSchema = joi.object().keys({
  ...idempotencyObj,
  email: joi.string().email()
});

export const createValid = (o: object) => validate(o, createSchema);

const authenticateSchema = joi.object().keys({
  ...idempotencyObj,
  jwt: joi.string()
});

export const authenticateValid = (o: object) => validate(o, authenticateSchema);
