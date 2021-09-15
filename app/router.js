'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// import { Application } from 'egg'
module.exports = app => {
  const { router, controller } = app;
  const test = app.middleware.test();
  router.get('/getUser', test, controller.home.index);
  router.post('/postTest', test, controller.home.postTest);




  // sql 相关
  router.post('/setSQL', test, controller.mysql.setSQL);
  router.get('/getDatabaseTree', test, controller.mysql.getDatabaseTree);
  router.post('/getTableData', test, controller.mysql.getTableData)

};
