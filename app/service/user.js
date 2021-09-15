'use strict';

const Service = require('egg').Service;


class UserService extends Service{
    constructor(ctx) {
        super(ctx);
    }
    
    async findUser() {
        console.log('------------------看看service-------------', this.ctx.query);
        const user = {
            name: 'testName',
            class: 'testClass',
        }
        return user;
    }
}
module.exports = UserService;