'use strict';

// const Controller = require('egg').Controller
import { Controller } from 'egg'

export default class MysqlBController extends Controller{
    async setSQL(){
        console.log('----------看看service都有啥------------', this.ctx.service.mysqlB);
        this.ctx.body = await this.ctx.service.mysqlB.setSQL(this.ctx.query);
    }
}

// module.exports = MysqlController;