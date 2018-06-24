import { Logger } from "../logger";

export class Players {
  logger: Logger;
  state: any;
  constructor(logger: Logger) {
    this.logger = logger;
    this.state = [];
  }

  public create(email: string, idempotencyKey: string) {
    this.state.push(email);
  }
}
