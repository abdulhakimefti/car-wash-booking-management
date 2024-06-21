import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
// import { VEHICLES } from "./booking.const";



const bookingSchema = new Schema<TBooking>({
    customer: {
        type:Schema.Types.ObjectId,
        unique: true,
        ref:'User'
    },
    serviceId:{
        type:Schema.Types.ObjectId,
        required:[true,'Service is Required'],
        unique: true,
        ref:'Service'
    },
    slotId:{
        type:Schema.Types.ObjectId,
        required:[true,'Slot is Required'],
        unique: true,
        ref:'Slot'
    },
    vehicleType :{
        type:String,
        enum: ['car', 'truck', 'SUV', 'van', 'motorcycle', 'bus', 'electricVehicle', 'hybridVehicle', 'bicycle', 'tractor'],
        required:[true,'Vehicle Type is required']   
    },
    vehicleBrand:{
        type:String,
        required:[true,'Vehicle Brand is required']
    },
    vehicleModel:{
        type:String,
        required: [true,'Vehicle Model is required']
    },
    manufacturingYear:{
        type:Number,
        required:[true,'Manufacturing Year is required']
    },
    registrationPlate:{
        type: String,
        required: [true,'Registration Plate is required']
    }

},{ versionKey: false,timestamps:true })


export const Booking = model<TBooking>('Booking',bookingSchema)