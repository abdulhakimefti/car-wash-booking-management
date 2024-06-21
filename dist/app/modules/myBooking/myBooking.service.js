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
Object.defineProperty(exports, "__esModule", { value: true });
exports.myBookingServices = void 0;
const booking_model_1 = require("../booking/booking.model");
const user_model_1 = require("../user/user.model");
const getMyBookingFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload });
    const result = yield booking_model_1.Booking.find({ customer: user === null || user === void 0 ? void 0 : user._id }).populate('customer').populate('serviceId').populate('slotId');
    return result;
});
exports.myBookingServices = {
    getMyBookingFromDB
};
