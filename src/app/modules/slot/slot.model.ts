import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";


const slotSchema = new Schema<TSlot>({
    service: {
        type: Schema.Types.ObjectId,
        required:[true,'Service is required'],
        ref:'Service'
    },
    date: {
        type:String,
        required:[true,'Date is required']
    },
    startTime:{
        type:String,
        required:[true,'Start Time is required']
    },
    endTime :{
        type:String,
        required:[true,'End Time is required']
    },
    isBooked : {
        type :String,
        enum:['available','booked', 'canceled'],
        default: 'available'
    }

},{ versionKey: false,timestamps:true })


export const Slot = model<TSlot>('Slot',slotSchema)