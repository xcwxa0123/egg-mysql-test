/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']//[]中放放出的白名单，*代表所有
  };
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.cluster = {
    listen: {
      port: 7026,
    }
  };

  config.mysql = {
    // database configuration
    clients: {
        db1: {
            // host
          host: '10.32.64.54',
          // port
          port: '3309',
          // username
          user: 'wike_test_admin',
          // password
          password: 'w4u1FWNs',
          // database
          database: 'wike_test',
        }    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1627352459207_6102';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
