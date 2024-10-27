const logger = require("pino");

const levels = {
  basic: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

module.exports = logger({
  customLevels: levels, // our defined levels
  useOnlyCustomLevels: true,
  level: "basic",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: "yyyy-dd-mm, h:MM:ss TT",
    },
  },
});
