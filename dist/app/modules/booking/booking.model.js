"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
// import { VEHICLES } from "./booking.const";
const bookingSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        unique: true,
        ref: 'User'
    },
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Service is Required'],
        unique: true,
        ref: 'Service'
    },
    slotId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Slot is Required'],
        unique: true,
        ref: 'Slot'
    },
    vehicleType: {
        type: String,
        enum: ['car', 'truck', 'SUV', 'van', 'motorcycle', 'bus', 'electricVehicle', 'hybridVehicle', 'bicycle', 'tractor'],
        required: [true, 'Vehicle Type is required']
    },
    vehicleBrand: {
        type: String,
        required: [true, 'Vehicle Brand is required']
    },
    vehicleModel: {
        type: String,
        required: [true, 'Vehicle Model is required']
    },
    manufacturingYear: {
        type: Number,
        required: [true, 'Manufacturing Year is required']
    },
    registrationPlate: {
        type: String,
        required: [true, 'Registration Plate is required']
    }
}, { versionKey: false, timestamps: true });
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
