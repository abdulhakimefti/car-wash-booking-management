import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(async(req,res)=>{
    const result = await bookingServices.createBookingIntoDB(req.body,req.user.userEmail)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"Booking successful",
        data:result
    })
})

const getAllBooking = catchAsync(async(req,res)=>{
    const result = await bookingServices.getAllBookingFromDB()
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:"All bookings retrieved successfully",
        data:result
    })
})

export const bookingControllers = {
    createBooking,getAllBooking
}