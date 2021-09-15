'use strict';

const Controller = require('egg').Controller

class MysqlController extends Controller{
    postParams = this.ctx.request.body.data; // POST类型的入参
    getParams = this.ctx.query; // GET类型的入参

    constructor(ctx){
        super(ctx)
    }

    async setSQL(){
        // console.log('----------看看getParams都有啥------------', this.getParams);
        this.ctx.body = await this.ctx.service.mysql.setSQL(this.postParams);
    }

    async getDatabaseTree(){
        this.ctx.body = await this.ctx.service.mysql.getDatabaseTree(this.getParams);
    }

    // 前端鼠标双击时获取指定表的数据
    async getTableData(){
        this.ctx.body = await this.ctx.service.mysql.getTableData(this.postParams);
    }
}

module.exports = MysqlController;