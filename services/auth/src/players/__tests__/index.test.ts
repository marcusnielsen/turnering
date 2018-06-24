import { Players } from "../index";
import { Logger } from "../../logger";
import jwt = require("jsonwebtoken");
import { Config } from "../../config";

test("create - validation error", () => {
  expect.assertions(1);

  return new Config({
    JWT_SECRET: "test",
    SERVER_PORT: 3001
  }).validState
    .then(configState => {
      const players = new Players(new Logger(), configState);
      return players.create({
        idempotencyKey: "4d197138-77e3-11e8-adc0-fa7ae01bbebc"
      });
    })
    .catch(e => {
      expect(e).toEqual({
        message: 'child "email" fails because ["email" is required]',
        type: "validation_error",
        details: [
          {
            context: { key: "email", label: "email" },
            message: '"email" is required',
            path: ["email"],
            type: "any.required"
          }
        ]
      });
    });
});

test("create - success", () => {
  process.env.JWT_SECRET = "test";
  expect.assertions(1);
  return new Config({
    JWT_SECRET: "test",
    SERVER_PORT: 3001
  }).validState
    .then(configState => {
      const players = new Players(new Logger(), configState);
      return players.create({
        idempotencyKey: "4d197138-77e3-11e8-adc0-fa7ae01bbebc",
        email: "test@example.com"
      });
    })
    .then(r => {
      const { email } = jwt.decode(r.jwt) as { email: string };
      expect(email).toEqual("test@example.com");
    });
});
