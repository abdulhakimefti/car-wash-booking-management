"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const mongoose_1 = require("mongoose");
const slotSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Service is required'],
        ref: 'Service'
    },
    date: {
        type: String,
        required: [true, 'Date is required']
    },
    startTime: {
        type: String,
        required: [true, 'Start Time is required']
    },
    endTime: {
        type: String,
        required: [true, 'End Time is required']
    },
    isBooked: {
        type: String,
        enum: ['available', 'booked', 'canceled'],
        default: 'available'
    }
}, { versionKey: false, timestamps: true });
exports.Slot = (0, mongoose_1.model)('Slot', slotSchema);
