'use strict';

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
  SUCCESS,
  ERROR,
  NOTIFICATION,
  MSG,
  CUSTOME_MSG,
};
