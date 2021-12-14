const Service = require('egg').Service;
// import { ResponseData } from '../dao/reponse_base'
const ResponseData = require('../dao/reponse_base').ResponseData

class MysqlService extends Service{
    constructor(ctx) {
        super(ctx);
    }
    
    // POST 任意sql语句
    async setSQL(data){
        // if(JSON.parse(data).sqlcontent.startsWith('//')){
            // 测试1分支加文字
        // }
        const sqlContent = JSON.parse(data).sqlcontent;
        const result = await this.app.mysql.get('db1').query(sqlContent, '');
        console.log('-------------看看处理结果--------------', result);
        let contentArr = sqlContent.split(/\s+/);
        const METHOD = contentArr[0];
        switch (METHOD) {
            case '':
                
                break;
        
            default:
                break;
        }


        // select 常规表格
        // insert // INSERT INTO `wike_test`.`users` (`name`, `age`) VALUES ('lijingyang', 233)
        // {
        //     fieldCount: 0,
        //     affectedRows: 1,
        //     insertId: 6,
        //     serverStatus: 2,
        //     warningCount: 0,
        //     message: '',
        //     protocol41: true,
        //     changedRows: 0
        //   }
        // update // UPDATE `wike_test`.`users` SET name = 'lijingyangTest' where id = 6
        // {
        //     fieldCount: 0,
        //     affectedRows: 1,
        //     insertId: 0,
        //     serverStatus: 2,
        //     warningCount: 0,
        //     message: '(Rows matched: 1  Changed: 1  Warnings: 0',
        //     protocol41: true,
        //     changedRows: 1
        //   }
        // delete // DELETE FROM `wike_test`.`users` WHERE name = 'lijingyang'
        // {
        //     fieldCount: 0,
        //     affectedRows: 2,
        //     insertId: 0,
        //     serverStatus: 34,
        //     warningCount: 0,
        //     message: '',
        //     protocol41: true,
        //     changedRows: 0
        //   }

        // let nameList = [];
        // result.forEach(element => {
        //     let otherName = Object.keys(element).filter(e => {
        //         return !nameList.includes(e) ? e : ''
        //     })
        //     nameList = nameList.concat(otherName);
        // });

        return Promise.resolve(new ResponseData(200, 'msg', result))
    }

    // GET 获取数据库-表结构树
    async getDatabaseTree(data){
        // 返回的总树结构
        const eggDB = this.app.mysql;
        const result = new Array();

        let sqlnameIterator = eggDB.clients.keys(),
            sqlItem = new Object(),
            sqlName;
        // 先装最上级的sqlBase
        while(sqlName = sqlnameIterator.next().value) {
            // resObj.label = 
            sqlItem.label = sqlName;
            sqlItem.children = [];
            sqlItem.level = 'sqlBase';

            const databaseResult = await this.getDatabase(eggDB, sqlName);
            for (let index = 0; index < databaseResult.length; index++) {
                let dbItem = new Object();
                const ele = databaseResult[index];
                dbItem.label = ele.Database;
                dbItem.children = [];
                dbItem.level = 'dataBase';
                const tableNamesResult = await this.getTable(eggDB, sqlName, ele.Database)
                tableNamesResult.forEach(tnEle => {
                    let tnItem = new Object();
                    tnItem.label = tnEle[`Tables_in_${ele.Database}`];
                    tnItem.children = [];
                    tnItem.level = 'table';
                    tnItem.beloneDB = ele.Database;
                    tnItem.beloneSB = sqlName;
                    dbItem.children.push(tnItem)
                })

                // dbItem全装完后再装进sqlItem
                sqlItem.children.push(dbItem)
            }

            // ？？？？？为啥forEach不支持await，是因为forEach实际上是已经被封装过一层了吗？？？
            // databaseResult.forEach(ele => {
            //     dbItem.label = ele.Database;
            //     dbItem.children = [];
            //     dbItem.level = 'dataBase';

            //     const tableNamesResult = await this.getTable(ele.Database)
            //     // await eggDB.get(ele.Database).query('SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES', '');
            //     let tnItem = new Object();
            //     tableNamesResult.forEach(tnEle => {
            //         tnItem.label = tnEle.TABLE_NAME;
            //         tnItem.children = [];
            //         tnItem.level = 'table';
            //         dbItem.push(tnItem)
            //     })

            //     // dbItem全装完后再装进sqlItem
            //     sqlItem.children.push(dbItem)
            // });
            // 全装完后再装sqlItem
            result.push(sqlItem)
        }

        return Promise.resolve(new ResponseData(200, 'msg', result))
    }
    // POST
    async getTableData(nodeItem) {
        const nodeObj = JSON.parse(nodeItem);

        let dataList = await this.app.mysql.get(nodeObj.beloneSB).query(`SELECT * FROM ${nodeObj.beloneDB}.${nodeObj.label}`)
        let nameList = [];
        dataList.forEach(element => {
            let otherName = Object.keys(element).filter(e => {
                return !nameList.includes(e) ? e : ''
            })
            nameList = nameList.concat(otherName);
        });

        return Promise.resolve(new ResponseData(200, 'msg', { nameList, dataList }));
    }

    // POST 事务
    async transaction(dataArray){
        const conn = await this.app.mysql.get(sqlName).beginTransaction();
        try {
            for (let index = 0; index < dataArray.length; index++) {
                const sqlContent = dataArray[index];
                const connResult = await conn.query(sqlContent);
            }
            await conn.commit();
            return Promise.resolve(new ResponseData(200, 'msg', conn))
        } catch (err) {
            await conn.rollback();
            throw err;
        }
    }
    
    // @
    async getAllDatabase(data){
        const result = await this.app.mysql.get('db1').query('SHOW DATABASES', '')
        return Promise.resolve(new ResponseData(200, 'msg', result))
    }
    
    // @
    async getTable(db, sqlName, dbName){
        const conn = await db.get(sqlName).beginTransaction();
        try {
            await conn.query(`USE ${dbName}`);
            const connResult = await conn.query(`SHOW TABLES`);
            await conn.commit();
            return connResult
        } catch (err) {
            await conn.rollback();
            throw err;
        }
    }
    // @
    async getDatabase(db, sqlName){
        return await db.get(sqlName).query('SHOW DATABASES', '');
    }

}
module.exports = MysqlService;