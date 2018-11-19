'use strict';

const winston = require('winston');
const { APPLICATOIN_CONSTANTS } = require('./common').constants.constants;

winston.configure({
  transports: [
    new winston.transports.Console({
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      json: false,
      level: APPLICATOIN_CONSTANTS.LEVEL,
    }),
  ],
});

module.exports = winston;
