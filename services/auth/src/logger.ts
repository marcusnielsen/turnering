import winston = require("winston");

export type InfoObject = {
  level: "info" | "error";
  message: string;
  action: string;
  idempotencyKey: string;
};

export class Logger {
  logger: winston.Logger;
  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.simple()
        })
      ]
    });
  }
  public info(s: string) {
    this.logger.info(s);
  }
  public error(s: string) {
    this.logger.error(s);
  }

  public event(action: string, message: string, idempotencyKey: string) {
    const infoObject: InfoObject = {
      action,
      idempotencyKey,
      level: "info",
      message
    };
    this.logger.info(infoObject);
  }
}
