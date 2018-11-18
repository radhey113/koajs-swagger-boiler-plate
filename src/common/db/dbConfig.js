'use strict';

const dbConfig = () => {
  return {
    HOST: '0.0.0.0',
    PORT: process.env.PORT || 4001,
    USERNAME: process.env.PORT || 'demo',
    PASSWORD: process.env.PORT || 'demo',
  };
};

module.exports = dbConfig;
