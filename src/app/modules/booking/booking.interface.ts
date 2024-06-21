import { Types } from "mongoose"

export type TVehicle ='car'| 'truck'|'SUV'| 'van'| 'motorcycle'| 'bus'| 'electricVehicle'| 'hybridVehicle'| 'bicycle'| 'tractor'
export type TBooking = {
    customer? : Types.ObjectId,
    serviceId: Types.ObjectId,
    slotId: Types.ObjectId,
    vehicleType : TVehicle,
    vehicleBrand:string,
    vehicleModel:string,
    manufacturingYear:number,
    registrationPlate:string
}