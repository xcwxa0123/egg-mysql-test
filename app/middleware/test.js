module.exports = () => { // 中间件test
    return async function (ctx, next) {
      await next();
      // 打印当前时间
      let timeToDate = new Date().toLocaleString();
      console.log('看看当前时间', timeToDate);
      console.log('看看ctx', ctx);
      console.log('看看next', next);
    }
  };