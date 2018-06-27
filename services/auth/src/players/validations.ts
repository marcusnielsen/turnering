import joi = require("joi");
import { validate } from "../utils";

const idempotencyObj = {
  idempotencyKey: joi.string().guid({ version: ["uuidv1"] })
};

const createSchema = joi.object().keys({
  ...idempotencyObj,
  email: joi.string().email()
});

export const create = (o: object) => validate(o, createSchema);

const verifyTokenSchema = joi.object().keys({
  ...idempotencyObj,
  jwt: joi.string()
});

export const verifyToken = (o: object) => validate(o, verifyTokenSchema);
