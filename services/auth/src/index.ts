import dotenv = require("dotenv");
import { Logger } from "./logger";
import express = require("express");
import bodyParser = require("body-parser");
import joi = require("joi");
import jwt = require("jsonwebtoken");

function main() {
  dotenv.config();
  const logger = new Logger();
  logger.info("Starting auth service.");
  const app = express();
  app.use(bodyParser.json());
  app.get("/alive", (req, res) => {
    res.json({ alive: true });
  });
  app.post("/players_create", (req, res) => {
    // const schema = joi.object().keys({
    //   idempotencyKey: joi.string().guid({ version: ["uuidv1"] }),
    //   email: joi.string().email()
    // });
    // joi
    //   .validate(req.body, schema, {
    //     presence: "required"
    //   })
    // .then((data: t.CreateArgs) => {
    //   logger.event("players_create", "validated", data.idempotencyKey);
    //   if (typeof process.env.JWT_SECRET !== "string") {
    //     throw new Error("Missing JWT_SECRET from env vars.");
    //   }
    //   const createSucceeded: t.CreateSucceeded = {
    //     jwt: jwt.sign(data.email, process.env.JWT_SECRET)
    //   };
    //   res.json(createSucceeded);
    // })
    // .catch((error: t.CreateFailed) => {
    //   const idempotencyKey =
    //     req.body && req.body.idempotencyKey === typeof "string"
    //       ? req.body.idempotencyKey
    //       : "none";
    //   logger.event("players_create_failed", error.message, idempotencyKey);
    //   res.json(error.message);
    // });
  });
  app.listen(process.env.SERVER_PORT, () => {
    logger.info(`Listening on port [${process.env.SERVER_PORT}].`);
  });
}

main();
