"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    duration: {
        type: Number,
        required: [true, 'Duratin is required']
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
}, { versionKey: false, timestamps: true });
exports.Service = (0, mongoose_1.model)('Service', serviceSchema);
