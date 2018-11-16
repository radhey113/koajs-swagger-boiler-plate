const winston = require('winston');

const { LOG_LEVEL } = require('./conf');

winston.configure({
  transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      json: false,
      level: LOG_LEVEL,
    }),
  ],
});

module.exports = winston;
