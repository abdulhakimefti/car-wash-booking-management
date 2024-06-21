"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const booking_route_1 = require("../modules/booking/booking.route");
const service_route_1 = require("../modules/service/service.route");
const slot_route_1 = require("../modules/slot/slot.route");
const myBooking_route_1 = require("../modules/myBooking/myBooking.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.userRoutes
    },
    {
        path: '/bookings',
        route: booking_route_1.bookingRoutes
    },
    {
        path: '/services',
        route: service_route_1.serviceRoutes
    },
    {
        path: '/slots',
        route: slot_route_1.slotRoutes
    },
    {
        path: '/my-bookings',
        route: myBooking_route_1.myBookingRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
