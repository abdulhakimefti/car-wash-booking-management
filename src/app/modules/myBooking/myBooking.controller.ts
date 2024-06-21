import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { myBookingServices } from "./myBooking.service";


const getMyBooking = catchAsync(async(req,res)=>{
    const result = await myBookingServices.getMyBookingFromDB(req.user.userEmail)

    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message: "User bookings retrieved successfully",
        data:result
    })
})

export const myBookingController = {
    getMyBooking
}