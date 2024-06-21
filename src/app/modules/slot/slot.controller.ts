import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { slotServices } from "./slot.service";


const getAvailableSlots = catchAsync(async(req,res)=>{
    const result = await slotServices.getAvailableSlotsFromDB(req.query)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Available slots retrieved successfully",
        data:result
    })
})



export const slotController = {
    getAvailableSlots
}