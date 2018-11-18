'use strict';
const mongoose = require('mongoose');
// const Promise = require('bluebird');

const dbConnection = () => {
  mongoose.connect(
    'mongodb://localhost:27017/test121',
    { useNewUrlParser: true },
    err => {
      err ? console.log(`Error is ${JSON.stringify(err)}`) : console.log(`DB is connected...`);
    },
  );
  return true;
};

module.exports = { dbConnection };
