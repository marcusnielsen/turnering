import joi = require("joi");
import { makeValidationError } from "../errors";

export const validate = (o: object, s: joi.ObjectSchema) =>
  joi
    .validate(o, s, {
      presence: "required"
    })
    .catch((e: joi.ValidationError) => {
      throw makeValidationError(e);
    });
