import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { serviceServices } from "./service.service";
import { TService } from "./service.interface";
// import { Types } from "mongoose";


const createService = catchAsync(async(req,res)=>{
    const result = await serviceServices.createServiceIntoDB(req.body)
   
    sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created successfully",
    data: result,
    })

    return result;
})


const getServices = catchAsync(async(req,res)=>{
    if(Object.keys(req.params).length>0){
        const result = await serviceServices.getServiceByID(req.params.id)
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Service retrieved successfully",
            data: result,
            })
        return result
    }
    else{
        const result = await serviceServices.getAllServiceFromDB()
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "Services retrieved successfully",
            data: result,
            })
        return result
    }
})

const serviceUpdate= catchAsync(async(req,res)=>{
    const result = await serviceServices.updateServiceFromDB(req.params.id,req.body)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Service updated successfully",
        data: result,
        })
    return result

})
const serviceDelete= catchAsync(async(req,res)=>{
    const softDelete:Partial<TService> = {
        isDeleted : true
    }
    const result = await serviceServices.updateServiceFromDB(req.params.id,softDelete)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Service deleted successfully",
        data: result,
        })
    return result

})

const createSlots = catchAsync(async(req,res)=>{
    const result = await serviceServices.createSlotIntoDB(req.body)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Slots created successfully",
        data: result,
        })
    return result
})



export const serviceController = {
    createService,getServices,serviceUpdate,serviceDelete,createSlots
}