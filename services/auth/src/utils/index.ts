import joi = require("joi");
import jsonwebtoken = require("jsonwebtoken");
import { makeValidationError } from "../errors";

export const validate = (o: object, s: joi.ObjectSchema) =>
  joi
    .validate(o, s, {
      presence: "required"
    })
    .catch((e: joi.ValidationError) => {
      throw makeValidationError(e);
    });

export const jwt = {
  sign: (o: object, s: string) => {
    return new Promise<string>((resolve, reject) => {
      jsonwebtoken.sign(o, s, (e, r) => {
        if (e) {
          reject(e);
          return;
        }
        resolve(r);
      });
    });
  }
};
