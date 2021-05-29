'use strict';

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  mysql:{
    enable: true,
    package: 'egg-mysql',
  },
  validate:{
    enable: true,
    package: 'egg-validate',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  redis:{
    enable: true,
    package: 'egg-redis',
  }
};

