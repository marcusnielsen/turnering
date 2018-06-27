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
  sign: (o: object, s: string) =>
    new Promise<string>((resolve, reject) => {
      jsonwebtoken.sign(o, s, (e, r) => {
        if (e) {
          reject(e);
          return;
        }
        resolve(r);
      });
    }),
  verify: (token: string, secret: string) =>
    new Promise<object>((resolve, reject) => {
      jsonwebtoken.verify(token, secret, (e, r) => {
        if (e) {
          reject(e);
          return;
        }
        if (typeof r === "string") {
          reject({
            type: "type_error",
            message:
              "type string not allowed. Sign the jwt as an object instead."
          });
          return;
        }
        resolve(r);
      });
    })
};
