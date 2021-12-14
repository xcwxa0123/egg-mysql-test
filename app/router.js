'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// import { Application } from 'egg'
module.exports = app => {
  const { router, controller } = app;
  const test = app.middleware.test();
  router.post('/getUser', test, controller.home.index);
  router.post('/postTest', test, controller.home.postTest);
  router.post('/signUp', test, controller.home.signUp);



  // sql 相关
  router.post('/setSQL', test, controller.mysql.setSQL);
  router.get('/getDatabaseTree', test, controller.mysql.getDatabaseTree);
  router.post('/getTableData', test, controller.mysql.getTableData)
  router.post('/transaction', test, controller.mysql.transaction)

};
