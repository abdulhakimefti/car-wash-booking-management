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
exports.bookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const booking_model_1 = require("./booking.model");
const slot_model_1 = require("../slot/slot.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createBookingIntoDB = (payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found');
    }
    const slot = yield slot_model_1.Slot.findOne({ _id: payload.slotId });
    if ((slot === null || slot === void 0 ? void 0 : slot.isBooked) === 'booked' || (slot === null || slot === void 0 ? void 0 : slot.isBooked) === 'canceled') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This Slot is not Available');
    }
    payload.customer = user === null || user === void 0 ? void 0 : user._id;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const booking = yield booking_model_1.Booking.create([payload], { session });
        if (!booking.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create booking');
        }
        const updateSlot = yield slot_model_1.Slot.findByIdAndUpdate(payload.slotId, { isBooked: 'booked' }, { new: true, session });
        if (!updateSlot) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update slot');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return booking;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getAllBookingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find()
        .populate('customer')
        .populate('service')
        .populate('slot');
    return result;
});
exports.bookingServices = {
    createBookingIntoDB,
    getAllBookingFromDB,
};
