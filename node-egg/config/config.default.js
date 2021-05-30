/* eslint valid-jsdoc: "off" */

'use strict';

const apiConfig=require('./api');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1622119131324_5118';

  config.uploadDir = 'app/public/images';

  // add your middleware config here
  config.middleware = [];

  config.jwt = {
    secret: '123456',
  };

  config.cors = {
    origin: '*', // 表示允许的源
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 表示允许的http请求方式
    credentials: true,
  };

  config.security={
    csrf:{
      enable:false, 
    }
  }

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456789',
      // 数据库名
      database: 'activity_database',   
    },
    // 是否加载到 app 上,默认开启
    app: true,
    // 是否加载到 agent 上,默认关闭
    agent: false,
  };

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: 'localhost',   // Redis host
      password: '123456',
      db: 0,
    },
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    httpCodeHash:{
      badRequest:422,
      successRequest:200
    }
  };

  return {
    ...config,
    ...userConfig,
    ...apiConfig
  };
};
