import joi = require("joi");
import jwt = require("jsonwebtoken");
import * as t from "./types";

export const createSchema = joi.object().keys({
  idempotencyKey: joi.string().guid({ version: ["uuidv1"] }),
  email: joi.string().email()
});

export const create = (o: object) =>
  joi
    .validate(o, createSchema, {
      presence: "required"
    })
    .then((o: object) => {
      const a = o as t.CreateArgs;
      // logger.event("players_create", "validated", data.idempotencyKey);
      if (typeof process.env.JWT_SECRET !== "string") {
        throw new Error("Missing JWT_SECRET from env vars.");
      }
      const createSucceeded: t.CreateSucceeded = {
        jwt: jwt.sign(a.email, process.env.JWT_SECRET)
      };
      return createSucceeded;
    })
    .catch((error: t.CreateFailed) => {
      if (error instanceof t.CreateFailed) {
      }
      const idempotencyKey =
        req.body && req.body.idempotencyKey === typeof "string"
          ? req.body.idempotencyKey
          : "none";

      logger.event("players_create_failed", error.message, idempotencyKey);
      res.json(error.message);
    });
