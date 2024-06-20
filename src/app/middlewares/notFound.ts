/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import httpStatus from "http-status";

const notFound: RequestHandler = (req,res,next)=>{
    return res.status(httpStatus.NOT_FOUND).json({
        success:false,
        message:'Not Found',
        error : '',
    })
}

export default notFound