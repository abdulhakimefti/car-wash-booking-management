import { Booking } from "../booking/booking.model"
import { User } from "../user/user.model"


const getMyBookingFromDB =async (payload:string) =>{
    const user = await User.findOne({email:payload})

    const result = await Booking.find({customer:user?._id}).populate('customer').populate('serviceId').populate('slotId')
    return result
}


export const myBookingServices = {
    getMyBookingFromDB
}