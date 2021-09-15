// export interface ResponseBase<T = any>{
//     setResponse: (params: T) => ResponseData
// }

export class ResponseData<T = any>{
    meta: Meta;
    data: T;
    // error?: Error;
    constructor(code: Number, msg: String, data : T){
        this.meta = new Meta(code, msg);
        this.data = data;
    }
}

export class Meta<T = any>{
    code: Number | String;
    message: String;
    constructor(code: Number| String, msg: T){
        this.code = code;
        this.message = msg.toString();
    }
}

// export class Error<T = Number | String>{
//     code: T;
//     message: String;
// }