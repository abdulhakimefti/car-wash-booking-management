import { Schema, model } from "mongoose";
import { TService } from "./service.interface";


const serviceSchema = new Schema<TService>({
    name : {
        type: String,
        required : [true,'Name is required']
    },
    description: {
        type: String,
        required : [true,'Description is required']
    },
    price : {
        type: Number,
        required : [true,'Price is required']
    },
    duration :{
        type: Number,
        required : [true,'Duratin is required']
    },
    isDeleted : {
        type: Boolean,
        required :true,
        default: false
    }
},{ versionKey: false,timestamps:true })



export const Service = model<TService>('Service',serviceSchema)