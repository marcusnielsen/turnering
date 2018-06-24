import { Logger } from "../logger";
import { ConfigState } from "../config";
import * as validations from "./validations";
import * as t from "./types";
import jwt = require("jsonwebtoken");

export class Players {
  private logger: Logger;
  private configState: ConfigState;
  private state: string[];

  constructor(logger: Logger, configState: ConfigState) {
    this.logger = logger;
    this.configState = configState;
    this.state = [];
  }

  public create(o: object) {
    return validations.createValid(o).then((o: object) => {
      const a = o as t.CreateArgs;
      this.state.push(a.email);
      const createSucceeded: t.CreateSucceeded = {
        // @TODO: make async.
        jwt: jwt.sign({ email: a.email }, this.configState.JWT_SECRET)
      };
      return createSucceeded;
    });
  }

  public authenticate(o: object) {
    return validations.authenticateValid(o).then((o: object) => {
      const a = o as t.AuthenticateArgs;
      // @TODO: make async.
      const result = jwt.verify(a.jwt, this.configState.JWT_SECRET) as {
        email: string;
      };

      return {
        authenticated: Boolean(
          this.state.filter((e: string) => result.email === e)[0]
        )
      };
    });
  }
}
