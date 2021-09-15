'use strict';

const Controller = require('egg').Controller;

// 测试用
class HomeController extends Controller {
  constructor(ctx) {
    super(ctx)
  }
  // get
  async index() {
    this.ctx.body = await this.ctx.service.user.findUser(this.ctx.query);
    this.ctx.body = {
      meta: {
        code: 200,
        message: 'success'
      },
      data: {
        val: this.ctx.query,
        user: userInfo
      }
    };
  }
  // post
  async postTest(val){
    this.ctx.body = {
      meta: {
        code: 200,
        message: 'success'
      },
      data: {
        val: JSON.parse(this.ctx.request.body.data).val
      }
    };
  }
}

module.exports = HomeController;