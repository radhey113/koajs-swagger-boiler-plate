'use strict';

const APPLICATOIN_CONSTANTS = {
  LEVEL: 'info',
  PROJECT_NAME: 'Koa Demo',
};

const SUCCESS = {};

const ERROR = {};

const NOTIFICATION = {};

const MSG = {};

const CUSTOME_MSG = (MSG, CODE, ERROR_CODE) => {
  return {
    message: MSG,
    status: CODE,
    errorCode: ERROR_CODE,
  };
};

module.exports = {
  APPLICATOIN_CONSTANTS,
  SUCCESS,
  ERROR,
  NOTIFICATION,
  MSG,
  CUSTOME_MSG,
};
