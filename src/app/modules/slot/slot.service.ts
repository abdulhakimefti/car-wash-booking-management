// import { TSlot } from "./slot.interface"
import { Slot } from "./slot.model"


const getAvailableSlotsFromDB =async (payload:Record<string, unknown>)=>{
    const result = await Slot.find({$and:[
        {date:payload.date},
        {service:payload.serviceId},
        {isBooked:'available'}
    ]}).populate('service')
    
    return result;
}

export const slotServices = {
    getAvailableSlotsFromDB
}