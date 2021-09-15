'use strict';
const Service = require('egg').Service;
import egg = require('egg')

// import { ResponseData } from '../dao/reponse_base'
class MysqlService<T = any> extends Service{
    constructor(ctx: egg.Context) {
        super(ctx)
    }

    async setSQL(requestParams: T): Promise<T>{
        console.log('setSQL进来的是啥------------------', requestParams);
        const result = await this.app.mysql.query('SHOW DATABASES', '')
        // return Promise.resolve(new ResponseData(200, 'msg', result))
        return Promise.resolve(result)
    }
}

module.exports = MysqlService;