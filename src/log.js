const winston = require('winston');

winston.configure({
  transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      json: false,
      level: 'info',
    }),
  ],
});

module.exports = winston;
