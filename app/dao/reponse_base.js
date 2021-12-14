// export interface ResponseBase<T = any>{
//     setResponse: (params: T) => ResponseData
// }

class ResponseData{
    constructor(code, msg, data){
        this.meta = new Meta(code, msg);
        this.data = data;
    }
}

class Meta{
    constructor(code, msg){
        this.code = code;
        this.message = msg.toString();
    }
}

// export class Error<T = Number | String>{
//     code: T;
//     message: String; 试试
// }
module.exports = { ResponseData, Meta}