import { Response } from "express";


type TResponse<T> = {
    statusCode : number;
    success: boolean;
    message?: string;
    token?:string
    data: T;
}

const sendResponse =<T> (res:Response,responseData:TResponse<T>) =>{
    res.status(responseData.statusCode).json({
        success: responseData.success,
        statusCode:responseData.statusCode,
        message:responseData.message,
        token:responseData.token,
        data : responseData.data    
    })
}

export default sendResponse