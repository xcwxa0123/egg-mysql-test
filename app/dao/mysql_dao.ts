import { ResponseData } from "./reponse_base";

export class MysqlDAO<T = any>{
    sqlContext: String
    // sqlType?: String
    // tableName?: String
    // orderType?: String
    constructor(sqlContext: String){
        this.sqlContext = sqlContext;
    }
    
    getResult(): T{
        
        return
    }
}