import joi = require("joi");
import { validate } from "./utils";

const schema = joi.object().keys({
  JWT_SECRET: joi.string(),
  SERVER_PORT: joi.number()
});

export type ConfigState = {
  JWT_SECRET: string;
  SERVER_PORT: number;
};

export class Config {
  public validState: Promise<Readonly<ConfigState>>;
  constructor(envVars: object) {
    this.validState = joi
      .validate(envVars, schema, { allowUnknown: true, presence: "required" })
      .then(o => {
        return o as ConfigState;
      });
  }
}
