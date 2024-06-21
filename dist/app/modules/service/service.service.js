"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const slot_model_1 = require("../slot/slot.model");
const service_model_1 = require("./service.model");
const createServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.create(payload);
    return result;
});
const getServiceByID = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findById(payload);
    return result;
});
const getAllServiceFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.find();
    return result;
});
const updateServiceFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
const createSlotIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(payload.service);
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The Service is not found!');
    }
    const isDeleted = service === null || service === void 0 ? void 0 : service.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This service is deleted');
    }
    const duration = service === null || service === void 0 ? void 0 : service.duration;
    const startTime = payload.startTime;
    const endTime = payload.endTime;
    const splittedStartTime = startTime.split(':');
    const splittedEndTime = endTime.split(':');
    let totalTime;
    if (Number(splittedEndTime[1]) >= Number(splittedStartTime[1])) {
        totalTime = (Number(splittedEndTime[0]) - Number(splittedStartTime[0])) * 60 + (Number(splittedEndTime[1]) - Number(splittedStartTime[1]));
    }
    else if (Number(splittedEndTime[1]) <= Number(splittedStartTime[1])) {
        totalTime = (Number(splittedEndTime[0]) - Number(splittedStartTime[0])) * 60 - (Number(splittedEndTime[1]) - Number(splittedStartTime[1]));
    }
    const totalSlot = totalTime / duration;
    let newEndTime = startTime;
    for (let i = 1; i <= totalSlot; i++) {
        payload.startTime = newEndTime;
        const newSplittedStartTime = newEndTime.split(':');
        const newTotalTime = (Number(newSplittedStartTime[0])) * 60 + (Number(newSplittedStartTime[1])) + duration;
        const hour = Math.trunc(Number(newTotalTime / 60));
        const hours = hour.toString().padStart(2, '0');
        const minute = (newTotalTime - (hour * 60)).toString().padStart(2, '0');
        newEndTime = `${hours}:${minute}`;
        payload.endTime = newEndTime;
        yield slot_model_1.Slot.create(payload);
    }
    const data = yield slot_model_1.Slot.find({ service: payload.service });
    return data;
});
exports.serviceServices = {
    createServiceIntoDB, getServiceByID, getAllServiceFromDB, updateServiceFromDB, createSlotIntoDB
};
