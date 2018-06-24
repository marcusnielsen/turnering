import dotenv = require("dotenv");
import { Logger } from "./logger";
import express = require("express");
import bodyParser = require("body-parser");
import joi = require("joi");
import jwt = require("jsonwebtoken");
import { Players } from "./players";
import { Config } from "./config";

function main() {
  dotenv.config();
  const logger = new Logger();
  logger.info("Starting auth service.");
  const app = express();
  app.use(bodyParser.json());

  const config = new Config(process.env);
  config.validState
    .then(configState => {
      app.get("/alive", (req, res) => {
        res.json({ alive: true });
      });

      const players = new Players(logger, configState);
      app.post("/players_create", (req, res) => {
        players
          .create(req.body)
          .then(result => {
            res.json(result);
          })
          .catch(result => {
            res.json(result);
          });
      });
      app.post("/players_authenticate", (req, res) => {
        players
          .authenticate(req.body)
          .then(result => {
            res.json(result);
          })
          .catch(result => {
            res.json(result);
          });
      });
      app.listen(process.env.SERVER_PORT, () => {
        logger.info(`Listening on port [${process.env.SERVER_PORT}].`);
      });
    })
    .catch(e => {
      logger.error(e);
      process.exit(1);
    });
}

main();
