'use strict';

const Service = require('egg').Service;
const ResponseData = require('../dao/reponse_base').ResponseData

const moment = require('moment')
class UserService extends Service{
    constructor(ctx) {
        super(ctx);
    }
    
    async findUser(params) {
        try {
            const sqlcontent = `SELECT * FROM users WHERE name='${params.account}' AND age='${params.password}'`
            const res = await this.ctx.service.mysql.setSQL(JSON.stringify({ sqlcontent }))
            let result = {};
            // 1 通过 0 不通过
            if(res.data && res.data.length){
                result = { status: 1, ...res.data[0] }
            } else {
                result = { status: 0 }
            }
            return Promise.resolve(new ResponseData(200, 'success', result));
        } catch (error) {
            console.error('error------>', error);
            return Promise.resolve(new ResponseData(500, 'error', error));
        }
    }

    async validateUser(params) {
        try {
            const sqlcontent = `SELECT * FROM users WHERE name='${params.account}'`
            const res = await this.ctx.service.mysql.setSQL(JSON.stringify({ sqlcontent }))
            let result = {};
            // 1 已存在 0 不存在
            if(res.data && res.data.length){
                result = { status: 1 }
            } else {
                result = { status: 0 }
            }
            return Promise.resolve(new ResponseData(200, 'success', result));
        } catch (error) {
            console.error('error------>', error);
            return Promise.resolve(new ResponseData(500, 'error', error));
        }
    }

    async signUp(params) {
        try {
            const validateUserRes = await this.validateUser({ account: params.account })
            if(validateUserRes.data){
                switch (validateUserRes.data.status) {
                    case 1:
                        // 已存在
                        return Promise.resolve(new ResponseData(200, '该账户已存在', { status: 0 }));
                    case 0:
                        // 不存在
                        const sqlcontent = `INSERT INTO users (name, age, created_at, updated_at) VALUES ('${params.account}', '${params.password}', '${moment().format('YYYY-MM-DD HH:mm:ss')}', '${moment().format('YYYY-MM-DD HH:mm:ss')}')`
                        const setSQLres = await this.ctx.service.mysql.setSQL(JSON.stringify({ sqlcontent }))
                        if(setSQLres.data && setSQLres.data.affectedRows) {
                            return Promise.resolve(new ResponseData(200, '已注册', { status: 1 }));
                        }else {
                            return Promise.resolve(new ResponseData(200, '注册失败，请联系管理员', { status: 0 }));
                        }
                }
            } else {
                return Promise.resolve(new ResponseData(200, '注册失败，请联系管理员', { status: 0 }));
            }
        } catch (error) {
            console.log('error------>', error);
            return Promise.resolve(new ResponseData(200, '注册失败，请联系管理员', { status: 0 }));
        }
    }
}
module.exports = UserService;