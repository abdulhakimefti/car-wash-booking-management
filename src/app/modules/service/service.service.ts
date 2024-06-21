import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TSlot } from "../slot/slot.interface";
import { Slot } from "../slot/slot.model";
import { TService } from "./service.interface";
import { Service } from "./service.model";


const createServiceIntoDB =async (payload:TService)=>{
    const result = await Service.create(payload)
    return result
}
const getServiceByID = async(payload:string)=>{
    const result = await Service.findById(payload)
    return result
}

const getAllServiceFromDB = async()=>{
    const result = await Service.find()
    return result
}

const updateServiceFromDB = async (id:string,payload:Partial<TService>)=>{
    const result = await Service.findOneAndUpdate({_id:id},payload,{new:true})
    return result
}


const createSlotIntoDB = async (payload:TSlot)=>{
    const service = await Service.findById(payload.service);
    if(!service){
        throw new AppError(httpStatus.NOT_FOUND,'The Service is not found!')
    }
    const isDeleted = service?.isDeleted
    if(isDeleted){
        throw new AppError(httpStatus.FORBIDDEN,'This service is deleted')
    }
    const duration = service?.duration
    const startTime = payload.startTime
    const endTime = payload.endTime
    const splittedStartTime = startTime.split(':')
    const splittedEndTime = endTime.split(':')
    let totalTime ;
    if(Number(splittedEndTime[1])>=Number(splittedStartTime[1])){
        totalTime = (Number(splittedEndTime[0])-Number(splittedStartTime[0]))*60+(Number(splittedEndTime[1])-Number(splittedStartTime[1]))
    }
    else if(Number(splittedEndTime[1])<=Number(splittedStartTime[1])){
        totalTime = (Number(splittedEndTime[0])-Number(splittedStartTime[0]))*60-(Number(splittedEndTime[1])-Number(splittedStartTime[1]))
    }
    const totalSlot = totalTime as number/duration;
    
    let newEndTime = startTime
    for(let i=1;i<=totalSlot;i++){
        payload.startTime = newEndTime
        const newSplittedStartTime = newEndTime.split(':')
        const newTotalTime = (Number(newSplittedStartTime[0]))*60+(Number(newSplittedStartTime[1])) + duration
        const hour = Math.trunc(Number(newTotalTime/60))
        const hours = hour.toString().padStart(2,'0')
       
        const minute = (newTotalTime - (hour*60)).toString().padStart(2,'0')
        newEndTime = `${hours}:${minute}`
        payload.endTime = newEndTime
        await Slot.create(payload)
      
    }

    const data = await Slot.find({service:payload.service})
   
    return data
}

export const serviceServices = {
    createServiceIntoDB,getServiceByID,getAllServiceFromDB,updateServiceFromDB,createSlotIntoDB
}